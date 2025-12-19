import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Users } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { InsightMirror } from '../../../components/hero/InsightMirror';
import { ChatInterface } from '../../../components/mobile/ChatInterface';
import { useNavigate } from 'react-router-dom';

export default function HeroPage() {
    const navigate = useNavigate();

    return (
        <div className="w-full">
            {/* Mobile: Chat Interface */}
            <div className="lg:hidden">
                <ChatInterface />
            </div>

            {/* Desktop: Split Screen Hero */}
            <div className="hidden lg:block relative overflow-hidden w-full">
                {/* Desktop Layout */}
                <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 min-h-[calc(100vh-64px)] flex items-center">

                    {/* Split Layout */}
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">

                        {/* Left Column: Problem Input & CTA (Span 5 to 6) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 flex flex-col gap-8"
                        >
                            {/* Eyebrow */}
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 w-fit"
                                >
                                    <Shield className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">AI Legal Diagnostic</span>
                                </motion.div>

                                <h1 className="text-4xl lg:text-5xl font-bold leading-[1.15] text-gray-900 tracking-tight">
                                    막막한 법적 문제,<br />
                                    <span className="text-primary relative inline-block">
                                        당신의 이야기
                                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                        </svg>
                                    </span>를<br />
                                    들려주세요.
                                </h1>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    탁월 AI가 당신의 상황을 분석하고,<br className="hidden lg:block" />
                                    데이터로 검증된 <span className="text-gray-900 font-medium">상위 1% 전문가</span>를 연결해 드립니다.
                                </p>
                            </div>

                            {/* CTA Group */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto shadow-lg shadow-primary/25"
                                    onClick={() => navigate('/diagnosis')}
                                >
                                    무료 진단 시작하기
                                    <ArrowRight className="w-5 h-5 ml-1" />
                                </Button>
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    서비스 소개 영상
                                </Button>
                            </div>

                            {/* Social Proof */}
                            <div className="pt-4 border-t border-gray-100 flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="user" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-medium text-gray-600">
                                        +1.2k
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                                    </div>
                                    <span className="text-sm text-gray-500 font-medium">12,000건의 상담 해결</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Insight Mirror (Span 7 to 6) */}
                        <div className="lg:col-span-7 w-full flex items-center justify-center lg:justify-end">
                            <InsightMirror />
                        </div>

                    </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent -z-10" />
            </div>
        </div>
    );
}
