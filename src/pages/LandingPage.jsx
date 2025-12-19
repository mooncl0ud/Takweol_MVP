import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Explicit default imports to avoid barrel file issues
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ChatBubble from '../components/ui/ChatBubble';
import TypingIndicator from '../components/ui/TypingIndicator';
import Card from '../components/ui/Card';

import { setProblemDescription, setClassification, setSimilarCases } from '../store/consultationSlice';
import { reviews, categories } from '../data/mockData';

// Mock AI Logic
const analyzeInput = (text) => {
    const keywords = {
        labor: ['상사', '야근', '해고', '임금', '월급', '퇴직', '괴롭힘', '폭언', '직장', '회사', '근로', '노동'],
        civil: ['계약', '돈', '채권', '소송', '합의', '손해', '배상', '미지급'],
        criminal: ['고소', '고발', '폭행', '사기', '협박', '명예훼손', '성범죄'],
        tax: ['세금', '세무', '국세청', '세무조사', '상속세', '증여세', '법인세'],
        psychology: ['스트레스', '우울', '불안', '번아웃', '힘들어', '지쳐'],
    };

    let maxScore = 0;
    let detectedCategory = 'civil';

    for (const [category, words] of Object.entries(keywords)) {
        const score = words.filter(word => text.includes(word)).length;
        if (score > maxScore) {
            maxScore = score;
            detectedCategory = category;
        }
    }

    const summaries = {
        labor: '직장 내 괴롭힘 또는 노동법 관련 문제로 보입니다.',
        civil: '계약 이행 및 손해배상 관련 민사 사안으로 판단됩니다.',
        criminal: '형사적 대응이 필요할 수 있는 중대한 사안입니다.',
        tax: '세무 조사 대응 및 절세 전략이 필요한 상황입니다.',
        psychology: '심리적 안정을 위한 전문가 상담이 필요해 보입니다.',
    };

    return {
        category: detectedCategory,
        confidence: Math.min(95, 70 + maxScore * 5),
        summary: summaries[detectedCategory],
        comfortMessage: "많이 당황스럽고 힘드셨겠어요. 하지만 혼자가 아닙니다. 전문가와 함께라면 해결할 수 있습니다.",
    };
};

export default function LandingPage() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [diagnosis, setDiagnosis] = useState(null);
    const messagesEndRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, diagnosis]);

    // Initial Greeting
    useEffect(() => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages([
                { id: 1, text: "안녕하세요. 오늘 마음 무거운 일이 있으셨나요?", isUser: false },
                { id: 2, text: "무슨 일이 있었는지 편하게 이야기해주세요. 제가 들어드릴게요.", isUser: false },
            ]);
        }, 1000);
    }, []);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setMessages(prev => [...prev, { id: Date.now(), text: userText, isUser: true }]);
        setInputValue('');
        dispatch(setProblemDescription(userText));

        setIsTyping(true);

        // Simulate AI Analysis
        setTimeout(() => {
            const result = analyzeInput(userText);
            dispatch(setClassification(result));

            const similarReviews = reviews.filter(r => {
                const cat = categories[result.category];
                return cat && r.caseType.includes(cat.description?.split(',')[0] || '');
            }).slice(0, 2);
            dispatch(setSimilarCases(similarReviews));

            setIsTyping(false);

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: result.comfortMessage,
                isUser: false
            }]);

            setTimeout(() => {
                setDiagnosis({
                    result,
                    similarReviews
                });
            }, 500);

        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const categoryInfo = diagnosis ? categories[diagnosis.result.category] : null;

    return (
        // Root padding-top-16 (64px) creates space for Fixed Global Header
        // bg-[#f2f4f6] matches the theme
        <div className="flex flex-col h-screen bg-[#f2f4f6] pt-16">

            {/* 1. Page Header */}
            {/* 
                - flex-none: Won't shrink
                - bg-[#f2f4f6]: Matches page bg, but we can make it sticky if we wanted.
                  User asked to "Force fixed location" for Nav bar (Global).
                  And Body starts below it.
                  This "What can I help?" header is part of the body flow but visually acts as a title.
                  If it scrolls UP and disappears behind Global Header, that's fine.
                  If User wants THIS to be fixed too, they would say "Title bar fixed".
                  User said "Global Nav Bar fixed, body starts below".
                  So this title scrolls with body.
                  Wait, previous user complaint "Header covers first bubble".
                  If this Title Bar is fixed, it covers bubbles.
                  I will make this Title Bar SCROLLABLE (part of body) so it goes away.
                  This ensures maximum view space.
                  OR if user wants it fixed, I need to stick it.
                  User said "상단 네비게이션 바(Global)를 강제로 고정".
                  So I'll assume only Global is fixed.
            */}
            <div className="flex-none pt-6 pb-6 px-6 text-center border-b border-gray-200 shadow-sm relative z-20 bg-[#f2f4f6]">
                <p className="text-sm text-gray-500 font-medium mb-1">AI 법률/상담 진단</p>
                <h1 className="text-xl font-bold text-gray-900">무엇을 도와드릴까요?</h1>

                <div className="absolute top-6 right-6">
                    <button
                        onClick={() => navigate('/experts')}
                        className="text-xs text-gray-400 font-medium hover:text-gray-600 underline"
                    >
                        건너뛰기
                    </button>
                </div>
            </div>

            {/* 2. Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 scroll-smooth z-0">
                <div className="max-w-xl mx-auto pt-6 pb-32">
                    {messages.map((msg, index) => {
                        // Dynamic Spacing Logic
                        // Default large gap (1.5cm ~ 60px)
                        let marginBottom = 'mb-[60px]';

                        // Check next message
                        const nextMsg = messages[index + 1];
                        if (nextMsg && nextMsg.isUser === msg.isUser) {
                            // If next message is from SAME sender, use small gap (0.3cm ~ 12px)
                            marginBottom = 'mb-3';
                        }

                        return (
                            <ChatBubble
                                key={msg.id}
                                message={msg.text}
                                isUser={msg.isUser}
                                className={marginBottom}
                            />
                        );
                    })}

                    {isTyping && <TypingIndicator />}

                    {/* AI Diagnosis Result Card */}
                    {diagnosis && categoryInfo && (
                        <div className="animate-slide-up">
                            <Card className="border-0 shadow-soft overflow-hidden p-0">
                                <div className="p-6 bg-white">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="text-3xl p-2 bg-gray-50 rounded-2xl">{categoryInfo.icon}</div>
                                            <div>
                                                <div className="text-sm text-gray-500 font-medium">분석 결과</div>
                                                <h3 className={`text-lg font-bold text-${categoryInfo.color}-500`}>
                                                    {categoryInfo.name} 관련 문제
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-gray-50 rounded-full text-xs font-bold text-gray-600">
                                            {diagnosis.result.confidence}% 일치
                                        </div>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed text-[15px] mb-4">
                                        <b>"{diagnosis.result.summary}"</b><br />
                                        전문적인 해결책이 필요한 상황입니다.
                                    </p>

                                    {/* Similar Case Teaser */}
                                    {diagnosis.similarReviews.length > 0 && (
                                        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-50">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                <p className="text-xs text-blue-600 font-bold">유사 해결 사례</p>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                "{diagnosis.similarReviews[0].comment.slice(0, 50)}..."
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Card Footer Action */}
                                <div className="p-4 bg-gray-50 border-t border-gray-100">
                                    <Button
                                        variant="primary"
                                        className="w-full py-3.5 text-base shadow-toss"
                                        onClick={() => navigate('/experts')}
                                    >
                                        전문가 3인 추천받기
                                    </Button>
                                </div>
                            </Card>
                            <p className="text-xs text-center text-gray-400 mt-4">
                                AI 진단은 참고용이며 법적 효력이 없습니다.
                            </p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* 3. Input Area */}
            {!diagnosis && (
                <div className="flex-none bg-white border-t border-gray-100 p-3 pb-6 safe-area-bottom z-30 relative">
                    <div className="max-w-xl mx-auto flex gap-2 items-end">
                        <button className="p-3 rounded-full text-gray-400 hover:text-primary-500 hover:bg-gray-50 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                        </button>
                        <div className="flex-1 bg-gray-50 rounded-[24px] px-4 py-2 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="메시지 입력..."
                                className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none resize-none h-[24px] py-1 text-base"
                                rows={1}
                                style={{ height: Math.min(inputValue.split('\n').length * 24 + 10, 100) + 'px' }}
                            />
                        </div>
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isTyping}
                            className="p-3 rounded-full bg-primary-500 text-white hover:bg-primary-600 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                        >
                            <svg className="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
