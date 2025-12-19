import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Image as ImageIcon, ArrowRight, Loader2, Shield, TrendingUp, Users, ChevronUp, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { performFullAnalysis } from '../../utils/analysisAlgorithm';

const INITIAL_MESSAGE = "안녕하세요, 탁월 AI입니다.\n오늘 어떤 법적인 고민 때문에 찾아오셨나요?\n\n편하게 말씀해 주시면, 제가 상황을 분석하고\n최적의 전문가를 찾아드릴게요.";

const AI_FOLLOW_UPS = [
    "네, 이해했습니다. 조금 더 구체적으로 여쭤볼게요.\n혹시 해당 상황이 언제부터 시작되었나요?",
    "알겠습니다. 그렇다면 관련 증거(메시지, 녹음 등)가 있으신가요?",
    "충분히 파악이 되었습니다.\n마지막으로, 원하시는 해결 방향이 있으신가요?\n(예: 합의, 소송, 진정 등)",
    "감사합니다. 모든 정보가 수집되었습니다.\n지금부터 최적의 전문가를 매칭해 드리겠습니다."
];

// Typing Indicator Component
function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex justify-start"
        >
            <div className="bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                <div className="flex gap-1.5 items-center">
                    <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                </div>
            </div>
        </motion.div>
    );
}

// Analysis Summary Bottom Sheet
function AnalysisBottomSheet({ analysis, onClose, onNavigate }) {
    if (!analysis) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 pb-8"
                onClick={e => e.stopPropagation()}
            >
                {/* Handle */}
                <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                        className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"
                    >
                        <Shield className="w-7 h-7 text-green-600" />
                    </motion.div>
                    <h2 className="text-xl font-bold text-gray-900">분석 완료!</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        <span className="font-bold text-primary">{analysis.primaryCase.name}</span> 사건으로 분류되었습니다
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{analysis.winRate}%</p>
                        <p className="text-xs text-gray-500">승소 확률</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{analysis.similarCases}</p>
                        <p className="text-xs text-gray-500">유사 사례</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <Shield className="w-5 h-5 text-secondary mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{analysis.experts.length}명</p>
                        <p className="text-xs text-gray-500">대기 전문가</p>
                    </div>
                </div>

                {/* Estimated Cost */}
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-600">예상 비용</p>
                    <p className="text-xl font-bold text-gray-900">
                        {analysis.estimatedCost.min}~{analysis.estimatedCost.max}
                        <span className="text-sm font-normal text-gray-500 ml-1">만원</span>
                    </p>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <Button
                        size="lg"
                        className="w-full shadow-lg shadow-primary/20"
                        onClick={onNavigate}
                    >
                        전문가 매칭 결과 보기
                    </Button>
                    <Button
                        size="lg"
                        variant="secondary"
                        className="w-full"
                        onClick={onClose}
                    >
                        계속 상담하기
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function ChatInterface() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: INITIAL_MESSAGE, timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [responseIndex, setResponseIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Perform analysis whenever messages change
    const performAnalysis = useCallback((msgs) => {
        const result = performFullAnalysis(msgs);
        setAnalysis(result);

        // Show bottom sheet when analysis is complete (100%)
        if (result && result.analysisProgress >= 100) {
            setTimeout(() => setShowBottomSheet(true), 500);
        }
    }, []);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();

        // User Message
        const userMsg = { id: Date.now(), type: 'user', text: userMessage, timestamp: new Date() };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInputValue("");

        // Perform analysis
        performAnalysis(newMessages);

        // Show typing indicator
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            setIsTyping(false);
            const aiMsg = {
                id: Date.now() + 1,
                type: 'ai',
                text: AI_FOLLOW_UPS[responseIndex % AI_FOLLOW_UPS.length],
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setResponseIndex(prev => prev + 1);
        }, 1200);
    };

    // Keyboard support - Enter to send
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const userMessageCount = messages.filter(m => m.type === 'user').length;
    const progressPercent = Math.min(userMessageCount * 25, 100);

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
            {/* Header with Status */}
            <div className="px-4 py-2.5 bg-white border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-gray-600">AI 분석 중</span>
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary text-xs"
                        onClick={() => navigate('/diagnosis')}
                    >
                        진단 결과 보기 <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                </div>

                {/* Progress Bar */}
                {userMessageCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 flex items-center gap-2"
                    >
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <span className="text-xs font-bold text-primary min-w-[32px]">{progressPercent}%</span>
                    </motion.div>
                )}
            </div>

            {/* Live Analysis Pill (when analysis available) */}
            <AnimatePresence>
                {analysis && !showBottomSheet && (
                    <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onClick={() => setShowBottomSheet(true)}
                        className="mx-4 mt-3 bg-white border border-gray-100 rounded-xl p-3 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Shield className="w-4 h-4 text-primary" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-gray-900">{analysis.primaryCase.name}</p>
                                <p className="text-[10px] text-gray-500">승소율 {analysis.winRate}% • {analysis.similarCases} 유사사례</p>
                            </div>
                        </div>
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            layout
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed whitespace-pre-line shadow-sm ${msg.type === 'user'
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                    }`}
                            >
                                {msg.text}
                                <div className={`text-[10px] mt-1 text-right ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                    {isTyping && <TypingIndicator />}
                </AnimatePresence>

                <div ref={messagesEndRef} />
            </div>

            {/* Sticky Input Area */}
            <div className="bg-white border-t border-gray-100 p-3 pb-safe-area">
                {/* Progress Hint */}
                <AnimatePresence>
                    {userMessageCount > 0 && userMessageCount < 4 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-center mb-2"
                        >
                            <span className="text-xs font-medium text-primary bg-primary/5 px-3 py-1 rounded-full">
                                {userMessageCount === 1 && "조금만 더 알려주세요!"}
                                {userMessageCount === 2 && "분석 정확도가 올라가고 있어요 ✨"}
                                {userMessageCount === 3 && "거의 다 왔어요! 마지막 정보만 더 💪"}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-[20px] p-2 pr-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                        <ImageIcon className="w-5 h-5" />
                    </button>

                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="상황을 입력해주세요..."
                        className="flex-1 bg-transparent border-none resize-none focus:ring-0 focus:outline-none text-sm max-h-24 py-2.5 px-0 placeholder:text-gray-400"
                        rows={1}
                    />

                    {inputValue.trim() ? (
                        <Button size="sm" className="rounded-full w-8 h-8 p-0" onClick={handleSend}>
                            <Send className="w-4 h-4" />
                        </Button>
                    ) : (
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                            <Mic className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Analysis Bottom Sheet */}
            <AnimatePresence>
                {showBottomSheet && (
                    <AnalysisBottomSheet
                        analysis={analysis}
                        onClose={() => setShowBottomSheet(false)}
                        onNavigate={() => navigate('/diagnosis')}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
