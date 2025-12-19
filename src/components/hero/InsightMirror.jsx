import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

const TYPING_TEXT = "팀장님이 회식 자리에서 저에게 심한 욕설을...";
const INSIGHT_DATA = {
    category: "직장 내 괴롭힘 감지",
    law: "근로기준법 제76조 2항",
    cases: 1240
};

export function InsightMirror() {
    const [displayText, setDisplayText] = useState("");
    const [showInsight, setShowInsight] = useState(false);
    const [isTyping, setIsTyping] = useState(true);

    // Typing Loop Effect
    useEffect(() => {
        let currentIndex = 0;
        let timeout;
        let loopTimeout;

        const typeChar = () => {
            if (currentIndex < TYPING_TEXT.length) {
                setDisplayText(TYPING_TEXT.slice(0, currentIndex + 1));
                currentIndex++;
                timeout = setTimeout(typeChar, 100); // Typing speed
            } else {
                setIsTyping(false);
                // Delay before showing insight
                timeout = setTimeout(() => {
                    setShowInsight(true);
                    // Loop reset
                    loopTimeout = setTimeout(() => {
                        setShowInsight(false);
                        setDisplayText("");
                        setIsTyping(true);
                        currentIndex = 0;
                        typeChar();
                    }, 5000); // Hold for 5s then reset
                }, 600);
            }
        };

        typeChar();

        return () => {
            clearTimeout(timeout);
            clearTimeout(loopTimeout);
        };
    }, []);

    return (
        <div className="relative w-full max-w-lg mx-auto perspective-1000">

            {/* Floating Card Container */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative bg-white rounded-3xl shadow-floating overflow-hidden border border-gray-100/50 backdrop-blur-sm"
            >
                {/* Header (Fake Browser/Editor UI) */}
                <div className="h-12 border-b border-gray-100 flex items-center justify-between px-6 bg-gray-50/50">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400/20"></div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
                        <Lock className="w-3 h-3 text-secondary" />
                        <span className="text-[10px] font-medium text-gray-500">End-to-End Encrypted</span>
                    </div>
                </div>

                {/* Editor Body */}
                <div className="p-8 h-[320px] bg-white relative">
                    <span className="text-lg text-gray-800 leading-relaxed font-medium">
                        {displayText}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-0.5 h-5 ml-0.5 bg-primary align-middle"
                        />
                    </span>

                    {!isTyping && displayText.length === 0 && (
                        <span className="text-gray-400 absolute top-8 left-8">어떤 법적 고민이 있으신가요?</span>
                    )}

                    {/* Insight Popover */}
                    <AnimatePresence>
                        {showInsight && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute bottom-6 right-6 left-6"
                            >
                                <div className="bg-white/90 backdrop-blur-md border border-primary/10 rounded-2xl shadow-soft-deep p-5 border-l-4 border-l-secondary">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-secondary/10 rounded-lg">
                                                <Zap className="w-4 h-4 text-secondary" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-800">{INSIGHT_DATA.category}</span>
                                        </div>
                                        <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                                            AI 분석 중
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                            <span>관련 법령: <span className="font-semibold text-gray-900">{INSIGHT_DATA.law}</span></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <AlertCircle className="w-4 h-4 text-gray-400" />
                                            <span>유사 해결 사례: <span className="font-bold text-secondary text-base">{INSIGHT_DATA.cases.toLocaleString()}</span>건</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Decorative Elements around Mirror */}
            <div className="absolute -z-10 top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        </div>
    );
}
