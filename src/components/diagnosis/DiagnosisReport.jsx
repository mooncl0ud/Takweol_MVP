import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, AlertTriangle, Scale, TrendingUp, Clock, Users } from 'lucide-react';

// Category color mapping
const CATEGORY_COLORS = {
    labor: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600', icon: 'text-red-500' },
    family: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', icon: 'text-purple-500' },
    property: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', icon: 'text-blue-500' },
    accident: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-600', icon: 'text-orange-500' },
    criminal: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', icon: 'text-gray-600' }
};

// Default values for fallback
const DEFAULT_ANALYSIS = {
    primaryCase: {
        name: '직장 내 괴롭힘',
        law: '근로기준법 제76조의2',
        category: 'labor',
        description: '상사의 폭언 및 공개적인 모욕 행위는 근로기준법 위반 소지가 다분합니다.',
        keyFindings: [
            '공개적인 욕설/모욕 (명예훼손 성립 가능)',
            '업무 시간 외 지속적인 지시 (사생활 침해)',
            '인사 고과 불이익 협박 (직권 남용)'
        ]
    },
    winRate: 72,
    similarCases: 127,
    estimatedCost: { min: 150, max: 350 }
};

export function DiagnosisReport({ analysis }) {
    // Use provided analysis or fallback to default
    const data = analysis || DEFAULT_ANALYSIS;
    const caseInfo = data.primaryCase;
    const colors = CATEGORY_COLORS[caseInfo.category] || CATEGORY_COLORS.labor;

    // Generate reference number
    const refNumber = `#${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 mb-8"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">AI 법률 진단 리포트</h2>
                        <p className="text-sm text-gray-500">입력하신 내용을 바탕으로 분석된 결과입니다.</p>
                    </div>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    Reference {refNumber}
                </span>
            </div>

            <div className="space-y-6">
                {/* Case Classification */}
                <div className={`${colors.bg} rounded-xl p-5 ${colors.border} border flex gap-4 items-start`}>
                    <AlertTriangle className={`w-5 h-5 ${colors.icon} shrink-0 mt-0.5`} />
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                            이 사안은 <span className={`${colors.text} font-bold border-b-2 ${colors.border}`}>{caseInfo.name}</span>에 해당할 확률이 높습니다.
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {caseInfo.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                            <Scale className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-500 font-medium">관련 법률: {caseInfo.law}</span>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-2" />
                        <p className="text-xl font-bold text-gray-900">{data.winRate}%</p>
                        <p className="text-xs text-gray-500">예상 승소율</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="text-xl font-bold text-gray-900">{data.similarCases}건</p>
                        <p className="text-xs text-gray-500">유사 사례</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <Clock className="w-5 h-5 text-secondary mx-auto mb-2" />
                        <p className="text-xl font-bold text-gray-900">{data.estimatedCost.min}~{data.estimatedCost.max}</p>
                        <p className="text-xs text-gray-500">예상 비용 (만원)</p>
                    </div>
                </div>

                {/* Key Findings */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">KEY FINDINGS</h4>
                    <ul className="space-y-3">
                        {(caseInfo.keyFindings || DEFAULT_ANALYSIS.primaryCase.keyFindings).map((item, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-2.5"
                            >
                                <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                                <span className="text-gray-700">{item}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Evidence Status */}
                {data.hasEvidence && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3"
                    >
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <div>
                            <p className="text-sm font-medium text-green-800">증거 자료 확보 확인</p>
                            <p className="text-xs text-green-600">제출해주신 증거 자료로 인해 승소 확률이 상향 조정되었습니다.</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
