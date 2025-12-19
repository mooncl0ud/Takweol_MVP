import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { categories, experts } from '../data/mockData';

// Lock Animation Component
const SecurityLock = ({ isUnlocking, onComplete }) => {
    const [phase, setPhase] = useState('locked'); // locked, unlocking, unlocked

    useEffect(() => {
        if (isUnlocking) {
            setPhase('unlocking');
            setTimeout(() => {
                setPhase('unlocked');
                onComplete?.();
            }, 1500);
        }
    }, [isUnlocking, onComplete]);

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
                {/* Outer ring animation */}
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${phase === 'unlocking' ? 'animate-ping bg-primary-200' :
                        phase === 'unlocked' ? 'bg-green-200 scale-110' : 'bg-gray-100'
                    }`} style={{ width: '80px', height: '80px' }}></div>

                {/* Lock icon */}
                <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${phase === 'unlocked' ? 'bg-green-100' : 'bg-primary-50'
                    }`}>
                    {phase === 'unlocked' ? (
                        <svg className="w-10 h-10 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className={`w-10 h-10 transition-all duration-300 ${phase === 'unlocking' ? 'text-primary-500 animate-pulse' : 'text-gray-400'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d={phase === 'unlocking'
                                    ? "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                    : "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                }
                            />
                        </svg>
                    )}
                </div>
            </div>
            <p className={`mt-4 font-medium transition-colors duration-300 ${phase === 'unlocked' ? 'text-green-600' : 'text-gray-600'
                }`}>
                {phase === 'locked' && 'AI 분석 준비 중...'}
                {phase === 'unlocking' && '안전하게 분석 중...'}
                {phase === 'unlocked' && '분석 완료!'}
            </p>
        </div>
    );
};

// Expert Card with emphasis on solved cases
const ExpertCard = ({ expert, matchReason, onClick }) => {
    const categoryInfo = categories[expert.category] || {};

    return (
        <Card
            className="p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 border-0"
            onClick={onClick}
        >
            {/* Top: Solved Cases Banner (Above profile) */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2.5 text-white">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-bold">유사 사례 {expert.similarCases || 15}건 해결</span>
                </div>
            </div>

            <div className="p-4">
                {/* Expert Info */}
                <div className="flex items-start gap-3 mb-3">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl overflow-hidden">
                        {expert.profileImage ? (
                            <img src={expert.profileImage} alt={expert.name} className="w-full h-full object-cover" />
                        ) : (
                            <span>{categoryInfo.icon || '👤'}</span>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 truncate">{expert.name}</h3>
                        <p className="text-sm text-gray-500">{expert.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-medium text-gray-700">{expert.rating}</span>
                            <span className="text-xs text-gray-400">({expert.reviewCount})</span>
                        </div>
                    </div>
                </div>

                {/* AI Match Reason */}
                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <p className="text-xs text-blue-600 font-medium flex items-center gap-1 mb-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        AI 매칭 사유
                    </p>
                    <p className="text-sm text-gray-700">
                        {matchReason || `${expert.specialization?.[0] || '해당 분야'} 전문성과 높은 해결률`}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {expert.specialization?.slice(0, 3).map((spec, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                            {spec}
                        </Badge>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default function DiagnosisPage() {
    const navigate = useNavigate();
    const { classification, problemDescription } = useSelector(state => state.consultation);

    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [showReport, setShowReport] = useState(false);
    const [recommendedExperts, setRecommendedExperts] = useState([]);

    const categoryInfo = classification ? categories[classification.category] : null;

    // Simulate analysis completion
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnalyzing(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // Get recommended experts
    useEffect(() => {
        if (classification) {
            const filtered = experts
                .filter(e => e.category === classification.category)
                .slice(0, 3)
                .map(e => ({
                    ...e,
                    similarCases: Math.floor(Math.random() * 20) + 10,
                }));
            setRecommendedExperts(filtered);
        }
    }, [classification]);

    const handleAnalysisComplete = () => {
        setShowReport(true);
    };

    // Fallback if no classification
    if (!classification) {
        return (
            <div className="min-h-screen bg-[#f2f4f6] pt-16 flex items-center justify-center">
                <Card className="p-8 text-center max-w-md">
                    <div className="text-4xl mb-4">🔍</div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">분석할 내용이 없습니다</h2>
                    <p className="text-sm text-gray-500 mb-4">먼저 상황을 입력해주세요</p>
                    <Button variant="primary" onClick={() => navigate('/wizard')}>
                        시작하기
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f2f4f6] pt-16 pb-8">
            <div className="max-w-4xl mx-auto px-4">

                {/* Security Lock Animation */}
                {isAnalyzing && (
                    <SecurityLock isUnlocking={true} onComplete={handleAnalysisComplete} />
                )}

                {/* Light Brief Report */}
                {showReport && (
                    <div className="animate-slide-up space-y-6">
                        {/* Report Header */}
                        <Card className="p-6 border-0 shadow-lg">
                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>AI 진단 리포트</span>
                            </div>

                            {/* 3-Line Summary */}
                            <div className="bg-gray-50 rounded-xl p-5 mb-5">
                                <div className="flex items-start gap-3">
                                    <div className="text-3xl">{categoryInfo?.icon || '📋'}</div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 mb-2">
                                            {categoryInfo?.name || '법률'} 관련 문제
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            {classification.summary}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Probability Classification */}
                            <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">AI 분석 결과</p>
                                    <p className="font-bold text-gray-900">
                                        이 사안은 <span className="text-primary-600">[{categoryInfo?.name}]</span>에 해당할 확률이 높습니다
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-primary-600">{classification.confidence}%</div>
                                    <div className="text-xs text-gray-400">일치율</div>
                                </div>
                            </div>

                            {/* Comfort Message */}
                            <div className="mt-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                                <p className="text-gray-700 leading-relaxed">
                                    💙 {classification.comfortMessage || "많이 힘드셨겠어요. 하지만 혼자가 아닙니다. 전문가와 함께라면 해결할 수 있습니다."}
                                </p>
                            </div>
                        </Card>

                        {/* Expert Recommendations */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-primary-500 rounded-full"></span>
                                추천 전문가 3인
                            </h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                {recommendedExperts.map((expert, idx) => (
                                    <ExpertCard
                                        key={expert.id || idx}
                                        expert={expert}
                                        matchReason={`귀하의 ${categoryInfo?.name} 사안과 유사한 경험 다수`}
                                        onClick={() => navigate(`/experts/${expert.id}`)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center pt-4">
                            <Button
                                variant="secondary"
                                onClick={() => navigate('/experts')}
                                className="text-gray-600"
                            >
                                전체 전문가 보기
                            </Button>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-xs text-center text-gray-400 pt-4">
                            AI 진단은 참고용이며 법적 효력이 없습니다. 정확한 판단은 전문가 상담을 통해 확인하세요.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
