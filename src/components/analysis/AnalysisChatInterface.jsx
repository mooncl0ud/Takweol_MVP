import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Image as ImageIcon, Building2, Briefcase, Home, Bot } from 'lucide-react';
import { Button } from '../ui/Button';
import { performFullAnalysis } from '../../utils/analysisAlgorithm';
import { useAnalysis } from '../../contexts/AnalysisContext';

// Phase-based conversation flow
const CHAT_PHASES = {
    PERSONA_SELECT: 'persona_select',
    GREETING: 'greeting',
    LISTENING: 'listening',
    ANALYSIS: 'analysis',
    MATCHING: 'matching'
};

const PERSONA_OPTIONS = [
    { id: 'startup', label: '스타트업/기업 대표', icon: Building2 },
    { id: 'employee', label: '직장인/실무자', icon: Briefcase },
    { id: 'individual', label: '개인/기타', icon: Home }
];

const PERSONA_GREETINGS = {
    startup: '대표님',
    employee: '실무자님',
    individual: '고객님'
};

const INITIAL_MESSAGE = "안녕하세요, 탁월 AI입니다.\n상위 1% 전문가를 연결해 드리기 전, 고객님에 대해 조금만 알려주세요.";

// Empathetic response templates
const getEmpatheticResponse = (phase, context) => {
    switch (phase) {
        case 'first_response':
            return `아, 그런 고민이 있으시군요. 많이 답답하셨겠습니다.\n\n조금 더 구체적으로 여쭤볼게요.\n혹시 해당 상황이 언제부터 시작되었나요?`;
        case 'second_response':
            return `네, 상황을 잘 이해했습니다. 충분히 걱정되실 만한 상황이시네요.\n\n그렇다면 관련 증거(메시지, 녹음, 계약서 등)가 있으신가요?`;
        case 'third_response':
            return `감사합니다. 상황을 완벽하게 파악했습니다.\n\n마지막으로, 원하시는 해결 방향이 있으신가요?\n(예: 합의, 소송, 자문 등)`;
        case 'matching':
            return `답변 감사합니다. 상황을 완벽하게 파악했습니다.\n\n${context?.greeting || '고객'}님의 케이스에 적합한 상위 1% 전문가 3분을 찾았습니다.`;
        default:
            return "네, 이해했습니다. 조금 더 자세히 알려주세요.";
    }
};

// Persona Selection Component (Compact version for desktop)
function PersonaSelector({ onSelect }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mt-2"
        >
            {PERSONA_OPTIONS.map((option) => {
                const IconComponent = option.icon;
                return (
                    <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(option)}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left text-xs"
                    >
                        <IconComponent className="w-4 h-4 text-primary" />
                        <span className="font-medium text-gray-700">{option.label}</span>
                    </motion.button>
                );
            })}
        </motion.div>
    );
}

export function AnalysisChatInterface({ onMessagesUpdate, onAnalysisUpdate, compact = false }) {
    const { updateAnalysis } = useAnalysis();
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: INITIAL_MESSAGE, timestamp: new Date(), showPersonaSelector: true }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [responseIndex, setResponseIndex] = useState(0);
    const [chatPhase, setChatPhase] = useState(CHAT_PHASES.PERSONA_SELECT);
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Notify parent whenever messages change
    useEffect(() => {
        if (onMessagesUpdate) {
            onMessagesUpdate(messages);
        }
    }, [messages, onMessagesUpdate]);

    // Handle persona selection
    const handlePersonaSelect = (persona) => {
        if (isProcessing) return;
        setIsProcessing(true);
        setSelectedPersona(persona);

        // Remove persona selector from initial message
        setMessages(prev => prev.map(msg =>
            msg.showPersonaSelector ? { ...msg, showPersonaSelector: false } : msg
        ));

        // Add user's persona selection as message
        const userMsg = {
            id: Date.now(),
            type: 'user',
            text: persona.label,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);

        // Show typing indicator
        setIsTyping(true);

        // Send personalized greeting
        setTimeout(() => {
            setIsTyping(false);
            const greeting = PERSONA_GREETINGS[persona.id];
            const greetingMsg = {
                id: Date.now() + 1,
                type: 'ai',
                text: `반갑습니다, ${greeting}.\n오늘 해결하고 싶은 가장 큰 고민은 무엇인가요?\n\n편하게 적어주세요.`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, greetingMsg]);
            setChatPhase(CHAT_PHASES.LISTENING);
            setIsProcessing(false);
        }, 800);
    };

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
        if (!inputValue.trim() || isProcessing) return;
        setIsProcessing(true);

        const userMessage = inputValue.trim();

        // User Message
        const userMsg = { id: Date.now(), type: 'user', text: userMessage, timestamp: new Date() };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInputValue("");

        // Perform analysis and save to context
        performAnalysisAndSave(newMessages);

        // Show typing indicator
        setIsTyping(true);

        // Determine response based on conversation phase
        const currentIndex = responseIndex;
        let responsePhase;
        if (currentIndex === 0) responsePhase = 'first_response';
        else if (currentIndex === 1) responsePhase = 'second_response';
        else if (currentIndex === 2) responsePhase = 'third_response';
        else responsePhase = 'matching';

        // Simulate AI Response with empathetic message
        setTimeout(() => {
            setIsTyping(false);
            const greeting = selectedPersona ? PERSONA_GREETINGS[selectedPersona.id] : '고객님';

            const aiMsg = {
                id: Date.now() + 1,
                type: 'ai',
                text: getEmpatheticResponse(responsePhase, { greeting }),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setResponseIndex(prev => prev + 1);

            if (responsePhase === 'matching') {
                setChatPhase(CHAT_PHASES.MATCHING);
            }
            setIsProcessing(false);
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
                <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            layout
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.type === 'ai' && (
                                <div className="flex items-start gap-2">
                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                        <Bot className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <div className="flex flex-col gap-2 max-w-[85%]">
                                        <div className="bg-white text-gray-800 border border-gray-100 rounded-3xl rounded-bl-md px-4 py-3 shadow-sm">
                                            <div className="text-[15px] leading-relaxed whitespace-pre-line">
                                                {msg.text}
                                            </div>
                                            <div className="text-[10px] mt-1 text-right text-gray-400">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                        {msg.showPersonaSelector && (
                                            <PersonaSelector onSelect={handlePersonaSelect} />
                                        )}
                                    </div>
                                </div>
                            )}
                            {msg.type === 'user' && (
                                <div className="max-w-[85%] rounded-3xl rounded-br-md px-4 py-3 text-[15px] leading-relaxed whitespace-pre-line shadow-sm bg-primary text-white">
                                    {msg.text}
                                    <div className="text-[10px] mt-1 text-right text-blue-100">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-start"
                        >
                            <div className="flex items-start gap-2">
                                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Bot className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <div className="bg-white text-gray-800 border border-gray-100 rounded-3xl rounded-bl-md px-4 py-3 shadow-sm">
                                    <div className="flex gap-1.5 items-center">
                                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-[24px] p-2 pr-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                        <ImageIcon className="w-5 h-5" />
                    </button>

                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={chatPhase === CHAT_PHASES.PERSONA_SELECT ? "위에서 선택해주세요" : "상황을 입력해주세요..."}
                        disabled={chatPhase === CHAT_PHASES.PERSONA_SELECT}
                        className="flex-1 bg-transparent border-none resize-none focus:ring-0 focus:outline-none text-sm max-h-24 py-2.5 px-0 placeholder:text-gray-400 disabled:opacity-50"
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
