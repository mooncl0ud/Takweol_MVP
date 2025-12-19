import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Scale,
    TrendingUp,
    FileText,
    Users,
    Shield,
    DollarSign,
    AlertTriangle,
    Sparkles,
    Tag
} from 'lucide-react';

export function LiveAnalysisPanel({ analysis }) {
    const hasAnalysis = analysis && analysis.primaryCase;

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
                    {hasAnalysis ? (
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
                                        <p className="text-xs text-gray-500">키워드 기반 자동 분류</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full">
                                    신뢰도 {analysis.primaryCase.confidence}%
                                </span>
                            </div>
                            <div className="bg-red-50/50 rounded-xl p-4 border border-red-100 mb-3">
                                <p className="font-bold text-red-700 text-lg mb-1">{analysis.primaryCase.name}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Scale className="w-4 h-4 text-gray-400" />
                                    <span>관련 법령: <span className="font-semibold text-gray-900">{analysis.primaryCase.law}</span></span>
                                </div>
                            </div>

                            {/* Matched Keywords */}
                            <div className="flex flex-wrap gap-1.5">
                                <Tag className="w-3.5 h-3.5 text-gray-400" />
                                {analysis.primaryCase.matchedKeywords.slice(0, 5).map((keyword, i) => (
                                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                                        {keyword}
                                    </span>
                                ))}
                            </div>

                            {/* Secondary Cases */}
                            {analysis.secondaryCases && analysis.secondaryCases.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 mb-2">다른 가능성:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis.secondaryCases.map((c, i) => (
                                            <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100">
                                                {c.name} ({c.confidence}%)
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                    {hasAnalysis && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.1 }}
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
                                    <p className="text-3xl font-bold text-primary">{analysis.similarCases}</p>
                                    <p className="text-xs text-gray-500 mt-1">건의 유사 사례</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <p className="text-3xl font-bold text-secondary">{analysis.patternMatch}%</p>
                                    <p className="text-xs text-gray-500 mt-1">패턴 일치율</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Win Rate Prediction */}
                <AnimatePresence>
                    {hasAnalysis && analysis.analysisProgress >= 50 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-green-50 rounded-xl">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">승소 확률 예측</h3>
                                        <p className="text-xs text-gray-500">유사 판례 분석 기반</p>
                                    </div>
                                </div>
                                {analysis.hasEvidence && (
                                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                                        <Shield className="w-3 h-3" /> 증거 확보
                                    </span>
                                )}
                            </div>
                            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${analysis.winRate}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">현재 예측</span>
                                <span className="font-bold text-green-600">{analysis.winRate}%</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Estimated Cost */}
                <AnimatePresence>
                    {hasAnalysis && analysis.analysisProgress >= 75 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.3 }}
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
                    {hasAnalysis && analysis.analysisProgress >= 100 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-5 text-white"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-white/20 rounded-xl">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold">매칭 가능 전문가</h3>
                                    <p className="text-xs text-blue-100">분석 완료 - 자동 매칭 준비됨</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {analysis.experts.map((expert, i) => (
                                    <div key={i} className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden">
                                            <img
                                                src={`https://i.pravatar.cc/100?u=${expert.name}`}
                                                alt={expert.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm">{expert.name} 변호사</p>
                                            <p className="text-xs text-blue-100">{expert.reason}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">⭐ {expert.rating}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty State */}
                {!hasAnalysis && (
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
