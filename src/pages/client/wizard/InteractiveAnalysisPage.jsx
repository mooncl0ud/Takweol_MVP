import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnalysisChatInterface } from '../../../components/analysis/AnalysisChatInterface';
import { LiveAnalysisPanel } from '../../../components/analysis/LiveAnalysisPanel';
import { Button } from '../../../components/ui/Button';
import { performFullAnalysis } from '../../../utils/analysisAlgorithm';
import { useAnalysis } from '../../../contexts/AnalysisContext';

export default function InteractiveAnalysisPage() {
    const navigate = useNavigate();
    const { analysis: contextAnalysis, updateAnalysis } = useAnalysis();
    const [analysis, setAnalysis] = useState(contextAnalysis);
    const [isComplete, setIsComplete] = useState(false);

    // Sync local state with context
    useEffect(() => {
        if (contextAnalysis) {
            setAnalysis(contextAnalysis);
        }
    }, [contextAnalysis]);

    const handleMessagesUpdate = useCallback((messages) => {
        // Perform analysis on the conversation
        const result = performFullAnalysis(messages);
        setAnalysis(result);

        // Save to context for DiagnosisPage
        if (result) {
            console.log('InteractiveAnalysisPage - Saving to context:', result.primaryCase?.name);
            updateAnalysis(result);
        }

        // Mark as complete when analysis is ready and progress is 100%
        if (result && result.analysisProgress >= 100 && !isComplete) {
            setTimeout(() => setIsComplete(true), 1500);
        }
    }, [isComplete, updateAnalysis]);

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
                        <LiveAnalysisPanel analysis={analysis} />
                    </div>

                    {/* Right: Chat Interface (40%) */}
                    <div className="lg:col-span-4 bg-white flex flex-col">
                        {/* Chat Header */}
                        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm">AI 상담</h3>
                                <p className="text-xs text-gray-500">상황을 자세히 설명해주세요</p>
                            </div>
                            {analysis && (
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                    {analysis.analysisProgress}% 완료
                                </span>
                            )}
                        </div>

                        {/* Chat Interface */}
                        <div className="flex-1 overflow-hidden">
                            <AnalysisChatInterface
                                onMessagesUpdate={handleMessagesUpdate}
                                compact={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Completion Modal */}
            {isComplete && analysis && (
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
                        <p className="text-gray-600 mb-4">
                            <span className="font-bold text-primary">{analysis.primaryCase.name}</span> 사건으로 분류되었습니다.
                        </p>
                        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-500">승소 확률</p>
                                    <p className="font-bold text-green-600">{analysis.winRate}%</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">예상 비용</p>
                                    <p className="font-bold text-gray-900">{analysis.estimatedCost.min}~{analysis.estimatedCost.max}만원</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">유사 사례</p>
                                    <p className="font-bold text-primary">{analysis.similarCases}건</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">대기 전문가</p>
                                    <p className="font-bold text-secondary">{analysis.experts.length}명</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Button
                                size="lg"
                                className="w-full"
                                onClick={() => navigate('/diagnosis')}
                            >
                                전문가 매칭 결과 보기
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
