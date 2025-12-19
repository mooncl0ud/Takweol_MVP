import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../components/ui/Button';
import ChatBubble from '../components/ui/ChatBubble';
import TypingIndicator from '../components/ui/TypingIndicator';
import Card from '../components/ui/Card';
import { setProblemDescription, setClassification, setSimilarCases } from '../store/consultationSlice';
import { reviews, categories } from '../data/mockData';

// Mock AI Logic (same as before)
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

    const relatedLaws = {
        labor: ['근로기준법 제76조의3 (직장 내 괴롭힘 금지)', '근로기준법 제23조 (해고 등의 제한)'],
        civil: ['민법 제390조 (채무불이행과 손해배상)', '민법 제750조 (불법행위의 내용)'],
        criminal: ['형법 제260조 (폭행)', '형법 제347조 (사기)'],
        tax: ['국세기본법 제81조의6 (세무조사)', '소득세법 제14조 (과세표준)'],
        psychology: ['근로자 지원 프로그램', '심리상담 서비스'],
    };

    return {
        category: detectedCategory,
        confidence: Math.min(95, 70 + maxScore * 5),
        summary: summaries[detectedCategory],
        comfortMessage: "많이 당황스럽고 힘드셨겠어요. 하지만 혼자가 아닙니다.",
        relatedLaws: relatedLaws[detectedCategory] || [],
        similarCaseCount: Math.floor(Math.random() * 50) + 10,
    };
};

// Insight Mirror Panel (Desktop only)
const InsightMirrorPanel = ({ insights, isAnalyzing }) => {
    if (!insights && !isAnalyzing) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <p className="text-center text-sm">
                    왼쪽에 상황을 입력하시면<br />
                    관련 법률과 사례를 분석해드립니다
                </p>
            </div>
        );
    }

    if (isAnalyzing) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8">
                {/* Lock Animation for Security */}
                <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full bg-primary-100 animate-ping opacity-30"></div>
                    <div className="relative w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center">
                        <svg className="w-10 h-10 text-primary-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>
                <p className="text-gray-600 font-medium mb-1">AI 분석 중...</p>
                <p className="text-gray-400 text-sm text-center">
                    입력하신 내용을 안전하게<br />분석하고 있습니다
                </p>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto p-6 space-y-6">
            <div className="animate-fade-in">
                <h3 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                    관련 법 조항
                </h3>
                <div className="space-y-2">
                    {insights.relatedLaws.map((law, idx) => (
                        <Card key={idx} className="p-3 bg-blue-50/50 border-blue-100">
                            <p className="text-sm text-gray-700">{law}</p>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    유사 사례
                </h3>
                <Card className="p-4 bg-green-50/50 border-green-100">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold text-green-600">{insights.similarCaseCount}</div>
                        <div>
                            <p className="text-sm text-gray-600">건의 유사 사례를</p>
                            <p className="text-sm text-gray-600">탁월에서 해결했습니다</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    AI 분석 결과
                </h3>
                <Card className="p-4 bg-purple-50/50 border-purple-100">
                    <p className="text-sm text-gray-700 leading-relaxed">{insights.summary}</p>
                    <div className="mt-3 flex items-center gap-2">
                        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                                style={{ width: `${insights.confidence}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{insights.confidence}%</span>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default function WizardPage() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [essayValue, setEssayValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [diagnosis, setDiagnosis] = useState(null);
    const [insights, setInsights] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const messagesEndRef = useRef(null);
    const debounceTimer = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Responsive check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, diagnosis]);

    // Initial Greeting (Mobile Chat)
    useEffect(() => {
        if (isMobile) {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages([
                    { id: 1, text: "안녕하세요. 오늘 마음 무거운 일이 있으셨나요?", isUser: false },
                    { id: 2, text: "무슨 일이 있었는지 편하게 이야기해주세요.", isUser: false },
                ]);
            }, 800);
        }
    }, [isMobile]);

    // Desktop Essay - Real-time Analysis (0.5s delay)
    const analyzeEssay = useCallback((text) => {
        if (text.length < 10) {
            setInsights(null);
            setIsAnalyzing(false);
            return;
        }
        setIsAnalyzing(true);

        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
            const result = analyzeInput(text);
            setInsights(result);
            setIsAnalyzing(false);
        }, 500); // 0.5s delay as per spec
    }, []);

    useEffect(() => {
        if (!isMobile && essayValue) {
            analyzeEssay(essayValue);
        }
    }, [essayValue, isMobile, analyzeEssay]);

    // Mobile Chat Send
    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setMessages(prev => [...prev, { id: Date.now(), text: userText, isUser: true }]);
        setInputValue('');
        dispatch(setProblemDescription(userText));

        setIsTyping(true);

        setTimeout(() => {
            const result = analyzeInput(userText);
            dispatch(setClassification(result));

            const similarReviews = reviews.filter(r => {
                const cat = categories[result.category];
                return cat && r.caseType.includes(cat.description?.split(',')[0] || '');
            }).slice(0, 2);
            dispatch(setSimilarCases(similarReviews));

            setIsTyping(false);

            // Qualitative progress message
            const progressMessages = [
                "잘 들었어요. 상황이 조금 더 이해가 됩니다.",
                "거의 다 왔어요, 조금만 더 말씀해 주시겠어요?",
                "함께 방법을 찾아볼게요.",
            ];

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

    // Desktop Submit
    const handleDesktopSubmit = () => {
        if (!essayValue.trim() || essayValue.length < 20) return;

        dispatch(setProblemDescription(essayValue));
        const result = analyzeInput(essayValue);
        dispatch(setClassification(result));

        const similarReviews = reviews.filter(r => {
            const cat = categories[result.category];
            return cat && r.caseType.includes(cat.description?.split(',')[0] || '');
        }).slice(0, 2);
        dispatch(setSimilarCases(similarReviews));

        navigate('/diagnosis');
    };

    const categoryInfo = diagnosis ? categories[diagnosis.result.category] : null;

    // ============ MOBILE LAYOUT ============
    if (isMobile) {
        return (
            <div className="flex flex-col h-screen bg-[#f2f4f6] pt-20">
                {/* Page Header */}
                <div className="flex-none pt-4 pb-4 px-4 text-center border-b border-gray-200 bg-white/80 backdrop-blur-md">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">AI 법률/상담 진단</p>
                    <h1 className="text-base font-bold text-gray-900">무엇을 도와드릴까요?</h1>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto px-4">
                    <div className="max-w-xl mx-auto pt-4 pb-32">
                        {messages.map((msg, index) => {
                            let marginBottom = 'mb-6';
                            const nextMsg = messages[index + 1];
                            if (nextMsg && nextMsg.isUser === msg.isUser) {
                                marginBottom = 'mb-2';
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

                        {/* Diagnosis Result */}
                        {diagnosis && categoryInfo && (
                            <div className="animate-slide-up">
                                <Card className="border-0 shadow-lg overflow-hidden p-0">
                                    <div className="p-5 bg-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-2xl p-2 bg-gray-50 rounded-xl">{categoryInfo.icon}</div>
                                            <div>
                                                <div className="text-xs text-gray-400">분석 결과</div>
                                                <h3 className="text-base font-bold text-gray-900">
                                                    {categoryInfo.name} 관련 문제
                                                </h3>
                                            </div>
                                            <div className="ml-auto px-2 py-1 bg-primary-50 rounded-full text-xs font-bold text-primary-600">
                                                {diagnosis.result.confidence}%
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {diagnosis.result.summary}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 border-t">
                                        <Button
                                            variant="primary"
                                            className="w-full py-3"
                                            onClick={() => navigate('/diagnosis')}
                                        >
                                            전문가 추천받기
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Fixed Input Area */}
                {!diagnosis && (
                    <div className="flex-none bg-white border-t border-gray-100 p-3 pb-6">
                        <div className="max-w-xl mx-auto flex gap-2 items-end">
                            <button className="p-2.5 rounded-full text-gray-400 hover:text-primary-500 hover:bg-gray-50">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                            <div className="flex-1 bg-gray-100 rounded-3xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-primary-200">
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="어떤 일이 있으셨나요?"
                                    className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none resize-none text-sm"
                                    rows={1}
                                    style={{ height: Math.min(inputValue.split('\n').length * 20 + 10, 80) + 'px' }}
                                />
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isTyping}
                                className="p-2.5 rounded-full bg-primary-500 text-white disabled:bg-gray-200 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ============ DESKTOP LAYOUT (6:4 Split) ============
    return (
        <div className="flex h-screen bg-[#f2f4f6] pt-20">
            {/* Left Panel (60%) - Essay Editor */}
            <div className="w-[60%] flex flex-col border-r border-gray-200 bg-white">
                {/* Header */}
                <div className="flex-none p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400 font-medium">AI 법률/상담 진단</p>
                            <h1 className="text-xl font-bold text-gray-900">어떤 상황인지 이야기해주세요</h1>
                        </div>
                        <button
                            onClick={() => navigate('/experts')}
                            className="text-sm text-gray-400 hover:text-gray-600"
                        >
                            건너뛰기
                        </button>
                    </div>
                </div>

                {/* Essay Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <textarea
                        value={essayValue}
                        onChange={(e) => setEssayValue(e.target.value)}
                        placeholder="최근 겪고 계신 문제에 대해 자유롭게 적어주세요. 상황을 자세히 설명해주실수록 더 정확한 진단이 가능합니다..."
                        className="w-full h-full min-h-[300px] bg-transparent text-gray-800 placeholder-gray-400 outline-none resize-none text-base leading-relaxed"
                    />
                </div>

                {/* Media Upload + Submit */}
                <div className="flex-none p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-500 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                <span className="text-sm">음성 입력</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-500 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">이미지 첨부</span>
                            </button>
                        </div>
                        <Button
                            variant="primary"
                            onClick={handleDesktopSubmit}
                            disabled={essayValue.length < 20}
                            className="px-6"
                        >
                            진단받기
                        </Button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        {essayValue.length < 20
                            ? `최소 20자 이상 입력해주세요 (${essayValue.length}/20)`
                            : '입력하신 내용은 암호화되어 안전하게 처리됩니다'
                        }
                    </p>
                </div>
            </div>

            {/* Right Panel (40%) - Insight Mirror */}
            <div className="w-[40%] bg-gray-50/50 flex flex-col">
                <div className="flex-none p-4 border-b border-gray-200 bg-white">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        실시간 인사이트
                    </h2>
                </div>
                <div className="flex-1 overflow-hidden">
                    <InsightMirrorPanel insights={insights} isAnalyzing={isAnalyzing} />
                </div>
            </div>
        </div>
    );
}
