import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Shield, CheckCircle, Star } from 'lucide-react';
import Button from '../components/ui/Button';

// Mock Data for Demo Animation
const TYPING_SEQUENCE = [
    "상사가 이유 없이 욕설을 하고...",
    "야근 수당도 제대로 주지 않습니다.",
    "이런 경우 어떻게 해야 하나요?",
];

const INSIGHT_CARDS = [
    { type: 'alert', title: '직장 내 괴롭힘 감지', color: 'red' },
    { type: 'law', title: '근로기준법 제76조의3', color: 'blue' },
    { type: 'case', title: '유사 승소 사례 1,240건', color: 'green' },
];

export default function LandingPage() {
    const navigate = useNavigate();
    const [typingText, setTypingText] = useState("");
    const [showInsights, setShowInsights] = useState(0);

    // Typing Effect Animation Loop
    useEffect(() => {
        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentString = TYPING_SEQUENCE[currentIndex];

            if (isDeleting) {
                setTypingText(currentString.substring(0, charIndex - 1));
                charIndex--;
                typingSpeed = 50;
            } else {
                setTypingText(currentString.substring(0, charIndex + 1));
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentString.length) {
                // Finished typing one line
                isDeleting = true;
                typingSpeed = 2000; // Pause before deleting
                setShowInsights(prev => (prev + 1) % 3); // Show next insight
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % TYPING_SEQUENCE.length;
                typingSpeed = 500;
                if (currentIndex === 0) setShowInsights(0); // Reset loop
            }

            setTimeout(type, typingSpeed);
        };

        const timer = setTimeout(type, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-background-base pt-16 overflow-x-hidden font-sans">
            {/* Hero Section Container */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-[calc(100vh-64px)] flex items-center">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">

                    {/* LEFT COLUMN: Copy & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8 max-w-2xl"
                    >
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span>
                            <span className="text-sm font-semibold text-primary-700 tracking-wide">AI 법률 진단 및 전문가 매칭 플랫폼</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.2] tracking-tight"
                        >
                            막막한 법적 문제,<br />
                            <span className="text-primary-600">당신의 이야기</span>를<br />
                            들려주세요.
                        </motion.h1>

                        {/* Subhead */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl text-gray-600 leading-relaxed font-regular"
                        >
                            탁월(Takweol) AI가 복잡한 문제를 분석하고,<br className="hidden lg:block" />
                            데이터로 검증된 <span className="font-semibold text-gray-900">최적의 전문가</span>를 안전하게 연결해 드립니다.
                        </motion.p>

                        {/* CTA Group */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => navigate('/wizard')}
                                className="h-14 px-8 text-lg rounded-2xl shadow-float hover:translate-y-[-2px] transition-transform flex items-center gap-2"
                            >
                                무료 진단 시작하기
                                <ArrowRight className="w-5 h-5" />
                            </Button>

                            <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm text-gray-600">
                                <Lock className="w-5 h-5 text-accent-amber" fill="currentColor" fillOpacity={0.2} />
                                <span className="text-sm font-medium">모든 대화는 익명으로 암호화됩니다</span>
                            </div>
                        </motion.div>

                        {/* Social Proof */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0 }}
                            className="flex items-center gap-4 pt-4"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-50 flex items-center justify-center text-xs font-bold text-primary-600 shadow-sm">
                                    +12k
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-1 text-accent-amber">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-sm text-gray-500 font-medium">
                                    <span className="font-bold text-gray-900">12,000건</span>의 상담이 안전하게 해결되었습니다.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>


                    {/* RIGHT COLUMN: Interactive Mockup (Insight Mirror) */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, delay: 0.2, type: "spring", stiffness: 50 }}
                        className="relative hidden lg:block"
                    >
                        {/* Main Mockup Frame */}
                        <div className="relative z-10 bg-white rounded-[32px] shadow-float border border-gray-100 overflow-hidden aspect-[16/10] bg-gradient-to-br from-white to-gray-50">

                            {/* Header Bar Mockup */}
                            <div className="h-14 border-b border-gray-100 flex items-center px-6 justify-between bg-white/80 backdrop-blur-md">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                                    <Lock className="w-3 h-3 text-gray-400" />
                                    <span className="text-[10px] text-gray-500 font-medium">Takweol Secure Shell</span>
                                </div>
                            </div>

                            {/* Split Content */}
                            <div className="flex h-full">

                                {/* Left: Editor Input */}
                                <div className="w-[55%] p-8 border-r border-gray-100">
                                    <h3 className="text-sm text-gray-400 font-bold mb-4">PROBLEM DESCRIPTION</h3>
                                    <div className="font-medium text-xl text-gray-800 leading-relaxed min-h-[120px]">
                                        "{typingText}<span className="animate-pulse text-primary-500">|</span>"
                                    </div>
                                </div>

                                {/* Right: Insight Mirror */}
                                <div className="w-[45%] bg-primary-50/30 p-6 flex flex-col gap-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm text-primary-600 font-bold flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            AI Detecting...
                                        </h3>
                                    </div>

                                    <AnimatePresence mode='popLayout'>
                                        {showInsights >= 1 && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="bg-white p-4 rounded-2xl shadow-card border-l-4 border-red-500"
                                            >
                                                <div className="text-xs text-red-500 font-bold mb-1">⚠️ 위험 감지</div>
                                                <div className="text-sm font-bold text-gray-900">직장 내 괴롭힘/폭언</div>
                                            </motion.div>
                                        )}

                                        {showInsights >= 2 && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="bg-white p-4 rounded-2xl shadow-card border-l-4 border-blue-500"
                                            >
                                                <div className="text-xs text-blue-500 font-bold mb-1">⚖️ 관련 법령</div>
                                                <div className="text-sm font-bold text-gray-900">근로기준법 제76조의3</div>
                                                <div className="text-xs text-gray-500 mt-1">사용자는 직장 내 괴롭힘 발생 시...</div>
                                            </motion.div>
                                        )}

                                        {showInsights >= 3 || typingText.length > 10 && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="bg-white p-4 rounded-2xl shadow-card border-l-4 border-green-500 bg-green-50/50"
                                            >
                                                <div className="text-xs text-green-600 font-bold mb-1">✅ 해결 가능성 분석</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-2xl font-bold text-gray-900">1,240</span>
                                                    <span className="text-sm text-gray-500">건의 유사 사례</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                            </div>

                        </div>

                        {/* Decorative Elements around Mockup */}
                        <div className="absolute -z-10 top-[-20px] right-[-20px] w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                        <div className="absolute -z-10 bottom-[-40px] left-[-40px] w-72 h-72 bg-accent-100 rounded-full blur-3xl opacity-40"></div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
