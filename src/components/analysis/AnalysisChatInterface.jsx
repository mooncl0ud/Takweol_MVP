import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { performFullAnalysis } from '../../utils/analysisAlgorithm';
import { useAnalysis } from '../../contexts/AnalysisContext';

const INITIAL_MESSAGE = "안녕하세요, 탁월 AI입니다.\n오늘 어떤 법적인 고민 때문에 찾아오셨나요?\n\n편하게 말씀해 주시면, 제가 상황을 분석하고\n최적의 전문가를 찾아드릴게요.";

const AI_FOLLOW_UPS = [
    "네, 이해했습니다. 조금 더 구체적으로 여쭤볼게요.\n혹시 해당 상황이 언제부터 시작되었나요?",
    "알겠습니다. 그렇다면 관련 증거(메시지, 녹음 등)가 있으신가요?",
    "충분히 파악이 되었습니다.\n마지막으로, 원하시는 해결 방향이 있으신가요?\n(예: 합의, 소송, 진정 등)",
    "감사합니다. 모든 정보가 수집되었습니다.\n지금부터 최적의 전문가를 매칭해 드리겠습니다."
];

export function AnalysisChatInterface({ onMessagesUpdate, onAnalysisUpdate, compact = false }) {
    const { updateAnalysis } = useAnalysis();
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: INITIAL_MESSAGE, timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [responseIndex, setResponseIndex] = useState(0);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Notify parent whenever messages change
    useEffect(() => {
        if (onMessagesUpdate) {
            onMessagesUpdate(messages);
        }
    }, [messages, onMessagesUpdate]);

    // Perform analysis on messages and save to context
    const performAnalysisAndSave = (msgs) => {
        const result = performFullAnalysis(msgs);

        if (result) {
            console.log('AnalysisChatInterface - Saving to context:', result.primaryCase?.name);
            updateAnalysis(result);

            // Also notify parent if callback provided
            if (onAnalysisUpdate) {
                onAnalysisUpdate(result);
            }
        }

        return result;
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();

        // User Message
        const userMsg = { id: Date.now(), type: 'user', text: userMessage, timestamp: new Date() };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInputValue("");

        // Perform analysis and save to context
        performAnalysisAndSave(newMessages);

        // Simulate AI Response
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                type: 'ai',
                text: AI_FOLLOW_UPS[responseIndex % AI_FOLLOW_UPS.length],
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setResponseIndex(prev => prev + 1);
        }, 1000);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const userMessageCount = messages.filter(m => m.type === 'user').length;

    return (
        <div className={`flex flex-col ${compact ? 'h-full' : 'h-[calc(100vh-64px)]'} bg-gray-50`}>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
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
                <div ref={messagesEndRef} />
            </div>

            {/* Progress Indicator */}
            {userMessageCount > 0 && (
                <div className="px-4 pb-2">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(userMessageCount * 25, 100)}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                            {Math.min(userMessageCount * 25, 100)}%
                        </span>
                    </div>
                </div>
            )}

            {/* Sticky Input Area */}
            <div className="bg-white border-t border-gray-100 p-3">
                <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-[20px] p-2 pr-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                        <ImageIcon className="w-5 h-5" />
                    </button>

                    <textarea
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
        </div>
    );
}
