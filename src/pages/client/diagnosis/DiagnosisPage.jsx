import React, { useState, useEffect } from 'react';
import { DiagnosisReport } from '../../../components/diagnosis/DiagnosisReport';
import { ExpertCard } from '../../../components/diagnosis/ExpertCard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../../../contexts/AnalysisContext';
import { CASE_TYPES } from '../../../utils/analysisAlgorithm';

// Fallback experts for when no analysis is available
const FALLBACK_EXPERTS = [
    {
        name: "김철수",
        cases: 15,
        rating: 4.9,
        reason: "직장 내 괴롭힘 사건 승소율 상위 1%",
        tags: ["대기업 출신", "노무사 자격 보유", "서울대 법대"]
    },
    {
        name: "이영희",
        cases: 23,
        rating: 5.0,
        reason: "유사한 '폭언/모욕' 사건 최다 해결",
        tags: ["여성 변호사", "심리상담사 1급", "부장판사 출신"]
    },
    {
        name: "박민수",
        cases: 8,
        rating: 4.8,
        reason: "가장 최근 유사 판례(2024다23...) 수행",
        tags: ["노동법 전문", "스타트업 자문", "IT 전문"]
    }
];

export default function DiagnosisPage() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { analysis } = useAnalysis();

    useEffect(() => {
        // Simulate analysis delay
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Get experts from analysis or fallback
    const getExperts = () => {
        if (analysis && analysis.experts) {
            return analysis.experts.map(expert => ({
                ...expert,
                reason: `${analysis.primaryCase.name} 사건 ${expert.cases}건 해결`,
                tags: [expert.specialty, `평점 ${expert.rating}`]
            }));
        }

        // If no analysis, try to get from CASE_TYPES based on primaryCase
        if (analysis && analysis.primaryCase) {
            const caseType = CASE_TYPES[analysis.primaryCase.id];
            if (caseType && caseType.experts) {
                return caseType.experts.map(expert => ({
                    ...expert,
                    reason: `${analysis.primaryCase.name} 사건 ${expert.cases}건 해결`,
                    tags: [expert.specialty, `평점 ${expert.rating}`]
                }));
            }
        }

        return FALLBACK_EXPERTS;
    };

    const experts = getExperts();
    const caseName = analysis?.primaryCase?.name || '직장 내 괴롭힘';

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
                    <span className="font-semibold text-primary">{caseName}</span> 사건에 대해{' '}
                    <span className="font-semibold text-secondary">{experts.length}명의 최적 전문가</span>를 찾았습니다.
                </p>
            </motion.div>

            {/* Dynamic Diagnosis Report */}
            <DiagnosisReport analysis={analysis} />

            {/* Dynamic Expert List */}
            <div className="mt-12">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    추천 전문가{' '}
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
