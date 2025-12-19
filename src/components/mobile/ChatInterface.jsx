```
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Image as ImageIcon, ChevronLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const INITIAL_MESSAGE = "안녕하세요, 탁월 AI입니다.\n오늘 어떤 법적인 고민 때문에 찾아오셨나요?\n\n편하게 말씀해 주시면, 제가 상황을 분석하고\n최적의 전문가를 찾아드릴게요.";

export function ChatInterface() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: INITIAL_MESSAGE, timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // User Message
        const userMsg = { id: Date.now(), type: 'user', text: inputValue, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        // Simulate AI Response (Progress Check)
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                type: 'ai',
                text: "거의 다 왔어요, 조금만 더 구체적으로 말씀해 주시겠어요?\n(예: 사건이 일어난 시점, 상대방의 반응 등)",
                isProgress: true // Special styling for progress prompts
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
           {/* Mobile Header / Nav Actions */}
           <div className="px-4 py-2 bg-white border-b border-gray-100 flex justify-end">
               <Button size="sm" variant="ghost" className="text-primary text-xs" onClick={() => navigate('/diagnosis')}>
                   진단 결과 보기 (Demo) <ArrowRight className="w-3 h-3 ml-1" />
               </Button>
           </div>
           
           {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${ msg.type === 'user' ? 'justify-end' : 'justify-start' } `}
                    >
                        <div
                            className={`max - w - [85 %] rounded - 2xl px - 4 py - 3 text - [15px] leading - relaxed whitespace - pre - line shadow - sm
                        ${
    msg.type === 'user'
    ? 'bg-primary text-white rounded-br-none'
    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
}
`}
                        >
                            {msg.text}
                            {/* Timestamp */}
                            <div className={`text - [10px] mt - 1 text - right ${ msg.type === 'user' ? 'text-blue-100' : 'text-gray-400' } `}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </motion.div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Sticky Input Area */}
            <div className="bg-white border-t border-gray-100 p-3 pb-safe-area">
                {/* Progress Text Helper */}
                {messages.length > 2 && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center mb-2"
                    >
                        <span className="text-xs font-medium text-primary bg-primary/5 px-3 py-1 rounded-full">
                            조금만 더 작성하면 정확도가 30% 올라가요!
                        </span>
                    </motion.div>
                )}

                <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-[20px] p-2 pr-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                        <ImageIcon className="w-5 h-5" />
                    </button>

                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="상황을 입력해주세요..."
                        className="flex-1 bg-transparent border-none resize-none focus:ring-0 text-sm max-h-24 py-2.5 px-0 placeholder:text-gray-400"
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
