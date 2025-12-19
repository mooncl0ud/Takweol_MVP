import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Scale,
    TrendingUp,
    FileText,
    Users,
    Shield,
    Clock,
    DollarSign,
    AlertTriangle,
    CheckCircle2,
    Sparkles
} from 'lucide-react';

// Mock analysis data that updates based on conversation progress
const ANALYSIS_STAGES = [
    {
        category: { detected: false },
        similarCases: { show: false },
        winRate: { show: false },
        estimatedCost: { show: false },
        experts: { show: false }
    },
    {
        category: { detected: true, name: "직장 내 괴롭힘", law: "근로기준법 제76조의2" },
        similarCases: { show: true, count: 47, platform: true },
        winRate: { show: false },
        estimatedCost: { show: false },
        experts: { show: false }
    },
    {
        category: { detected: true, name: "직장 내 괴롭힘", law: "근로기준법 제76조의2" },
        similarCases: { show: true, count: 127, platform: true },
        winRate: { show: true, rate: 73, trend: "상승" },
        estimatedCost: { show: false },
        experts: { show: false }
    },
    {
        category: { detected: true, name: "직장 내 괴롭힘", law: "근로기준법 제76조의2" },
        similarCases: { show: true, count: 127, platform: true },
        winRate: { show: true, rate: 78, trend: "상승" },
        estimatedCost: { show: true, min: 150, max: 350, unit: "만원" },
        experts: { show: true, count: 3 }
    }
];

export function LiveAnalysisPanel({ messageCount = 0 }) {
    const stageIndex = Math.min(messageCount, ANALYSIS_STAGES.length - 1);
    const analysis = ANALYSIS_STAGES[stageIndex];

    return (
        <div className="h-full overflow-y-auto p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold text-gray-900">실시간 AI 분석</h2>
                </div>
                <p className="text-sm text-gray-500">
                    대화 내용을 바탕으로 실시간으로 분석 중입니다
                </p>
            </div>

            {/* Analysis Cards */}
            <div className="space-y-4">
                {/* Case Category Detection */}
                <AnimatePresence mode="wait">
                    {analysis.category.detected ? (
                        <motion.div
                            key="category-detected"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-red-50 rounded-xl">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">사건 유형 감지</h3>
                                        <p className="text-xs text-gray-500">AI 자동 분류</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full">
                                    감지됨
                                </span>
                            </div>
                            <div className="bg-red-50/50 rounded-xl p-4 border border-red-100">
                                <p className="font-bold text-red-700 text-lg mb-1">{analysis.category.name}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Scale className="w-4 h-4 text-gray-400" />
                                    <span>관련 법령: <span className="font-semibold text-gray-900">{analysis.category.law}</span></span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="category-waiting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-xl">
                                    <Scale className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-400">사건 유형 분석 중...</h3>
                                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gray-300 rounded-full"
                                            animate={{ width: ["0%", "60%", "30%", "80%"] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Similar Cases */}
                <AnimatePresence>
                    {analysis.similarCases.show && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-blue-50 rounded-xl">
                                    <FileText className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">유사 사례</h3>
                                    <p className="text-xs text-gray-500">탁월 플랫폼 내 데이터 기반</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <p className="text-3xl font-bold text-primary">{analysis.similarCases.count}</p>
                                    <p className="text-xs text-gray-500 mt-1">건의 유사 사례</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <p className="text-3xl font-bold text-secondary">89%</p>
                                    <p className="text-xs text-gray-500 mt-1">패턴 일치율</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Win Rate Prediction */}
                <AnimatePresence>
                    {analysis.winRate.show && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-green-50 rounded-xl">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">승소 확률 예측</h3>
                                        <p className="text-xs text-gray-500">AI 기반 예측 모델</p>
                                    </div>
                                </div>
                                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                    <TrendingUp className="w-3 h-3" /> {analysis.winRate.trend}
                                </span>
                            </div>
                            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${analysis.winRate.rate}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">현재 예측</span>
                                <span className="font-bold text-green-600">{analysis.winRate.rate}%</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Estimated Cost */}
                <AnimatePresence>
                    {analysis.estimatedCost.show && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-amber-50 rounded-xl">
                                    <DollarSign className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">예상 비용</h3>
                                    <p className="text-xs text-gray-500">시장 평균 대비 절감 가능</p>
                                </div>
                            </div>
                            <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-2xl font-bold text-gray-900">
                                        {analysis.estimatedCost.min} ~ {analysis.estimatedCost.max}
                                    </span>
                                    <span className="text-gray-600">{analysis.estimatedCost.unit}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-amber-700">
                                    <Shield className="w-3 h-3" />
                                    <span>탁월 Price Cap 적용 시 최대 30% 절감</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Available Experts */}
                <AnimatePresence>
                    {analysis.experts.show && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-5 text-white"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-white/20 rounded-xl">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold">매칭 가능 전문가</h3>
                                    <p className="text-xs text-blue-100">분석 완료 후 자동 매칭</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-white/20 overflow-hidden">
                                            <img
                                                src={`https://i.pravatar.cc/100?img=${10 + i}`}
                                                alt="expert"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold">{analysis.experts.count}명</p>
                                    <p className="text-xs text-blue-100">전문가 대기 중</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty State */}
                {messageCount === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-gray-400 font-medium mb-2">분석 대기 중</h3>
                        <p className="text-sm text-gray-400">
                            채팅창에서 상황을 설명해주시면<br />
                            실시간으로 분석 결과가 나타납니다
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
