import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnalysisChatInterface } from '../../../components/analysis/AnalysisChatInterface';
import { LiveAnalysisPanel } from '../../../components/analysis/LiveAnalysisPanel';
import { Button } from '../../../components/ui/Button';

export default function InteractiveAnalysisPage() {
    const navigate = useNavigate();
    const [messageCount, setMessageCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const handleMessageSent = (message, count) => {
        setMessageCount(count);

        // Mark as complete after 4 messages
        if (count >= 4) {
            setTimeout(() => setIsComplete(true), 1500);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-100 px-6 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate('/wizard/problem')}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">돌아가기</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Lock className="w-3.5 h-3.5 text-secondary" />
                            <span>End-to-End 암호화</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Shield className="w-3.5 h-3.5 text-primary" />
                            <span>데이터 보안 인증</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content: 6:4 Split Layout */}
            <div className="max-w-7xl mx-auto h-[calc(100vh-64px-49px)]">
                <div className="grid lg:grid-cols-10 h-full">
                    {/* Left: Live Analysis Panel (60%) */}
                    <div className="lg:col-span-6 bg-gradient-to-br from-gray-50 to-blue-50/30 border-r border-gray-100 overflow-hidden">
                        <LiveAnalysisPanel messageCount={messageCount} />
                    </div>

                    {/* Right: Chat Interface (40%) */}
                    <div className="lg:col-span-4 bg-white flex flex-col">
                        {/* Chat Header */}
                        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm">AI 상담</h3>
                                <p className="text-xs text-gray-500">상황을 자세히 설명해주세요</p>
                            </div>
                            {messageCount > 0 && (
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                    {Math.min(messageCount * 25, 100)}% 완료
                                </span>
                            )}
                        </div>

                        {/* Chat Interface */}
                        <div className="flex-1 overflow-hidden">
                            <AnalysisChatInterface
                                onMessageSent={handleMessageSent}
                                compact={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Completion Modal */}
            {isComplete && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
                    >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">분석 완료!</h2>
                        <p className="text-gray-600 mb-6">
                            충분한 정보가 수집되었습니다.<br />
                            최적의 전문가를 매칭해드릴게요.
                        </p>
                        <div className="space-y-3">
                            <Button
                                size="lg"
                                className="w-full"
                                onClick={() => navigate('/diagnosis')}
                            >
                                진단 결과 보기
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="w-full"
                                onClick={() => setIsComplete(false)}
                            >
                                계속 상담하기
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
