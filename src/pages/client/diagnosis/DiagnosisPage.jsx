import React, { useState, useEffect } from 'react';
import { DiagnosisReport } from '../../../components/diagnosis/DiagnosisReport';
import { ExpertCard } from '../../../components/diagnosis/ExpertCard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../../../contexts/AnalysisContext';
import { CASE_TYPES } from '../../../utils/analysisAlgorithm';

export default function DiagnosisPage() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { analysis } = useAnalysis();

    useEffect(() => {
        // Simulate analysis delay
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Debug log to check analysis state
    useEffect(() => {
        console.log('DiagnosisPage - Analysis from context:', analysis);
    }, [analysis]);

    // Get experts dynamically from analysis
    const getExperts = () => {
        // 1. First try: use experts from analysis result
        if (analysis && analysis.experts && analysis.experts.length > 0) {
            return analysis.experts.map(expert => ({
                ...expert,
                reason: `${analysis.primaryCase?.name || '사건'} ${expert.cases}건 해결`,
                tags: [expert.specialty, `평점 ${expert.rating}`]
            }));
        }

        // 2. Second try: get from CASE_TYPES based on primaryCase id
        if (analysis && analysis.primaryCase && analysis.primaryCase.id) {
            const caseType = CASE_TYPES[analysis.primaryCase.id];
            if (caseType && caseType.experts) {
                return caseType.experts.map(expert => ({
                    ...expert,
                    reason: `${analysis.primaryCase.name} 사건 ${expert.cases}건 해결`,
                    tags: [expert.specialty, `평점 ${expert.rating}`]
                }));
            }
        }

        // 3. Fallback: return default workplace_harassment experts (only when no analysis)
        const defaultType = CASE_TYPES.workplace_harassment;
        return defaultType.experts.map(expert => ({
            ...expert,
            reason: `${defaultType.name} 사건 ${expert.cases}건 해결`,
            tags: [expert.specialty, `평점 ${expert.rating}`]
        }));
    };

    const experts = getExperts();

    // Dynamic case name - no hardcoding
    const caseName = analysis?.primaryCase?.name || '법률 상담';
    const hasAnalysis = analysis && analysis.primaryCase;

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full mb-4"
                />
                <p className="text-sm font-medium text-gray-500 animate-pulse">
                    의뢰인님의 데이터를 암호화하여 분석 중입니다...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-3xl font-bold text-gray-900 mb-3">AI 진단 결과</h1>
                <p className="text-gray-500">
                    {hasAnalysis ? (
                        <>
                            <span className="font-semibold text-primary">{caseName}</span> 사건에 대해{' '}
                            <span className="font-semibold text-secondary">{experts.length}명의 최적 전문가</span>를 찾았습니다.
                        </>
                    ) : (
                        <>분석 결과를 불러오는 중입니다. 채팅을 먼저 진행해주세요.</>
                    )}
                </p>
            </motion.div>

            {/* Dynamic Diagnosis Report */}
            <DiagnosisReport analysis={analysis} />

            {/* Dynamic Expert List */}
            <div className="mt-12">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    {hasAnalysis ? `${caseName} 전문가` : '추천 전문가'}{' '}
                    <span className="flex items-center justify-center w-6 h-6 bg-primary text-white text-xs rounded-full">
                        {experts.length}
                    </span>
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experts.map((expert, idx) => (
                        <ExpertCard
                            key={idx}
                            {...expert}
                            delay={idx * 0.15}
                            onBook={() => navigate('/booking')}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
