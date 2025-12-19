import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Badge } from '../components/ui';
import { ReviewCard } from '../components';
import { setClassification, setSimilarCases, setCurrentStep } from '../store/consultationSlice';
import { categories, reviews } from '../data/mockData';

// Mock AI classifier
const classifyProblem = (text) => {
    const keywords = {
        labor: ['상사', '야근', '해고', '임금', '월급', '퇴직', '괴롭힘', '폭언', '직장', '회사', '근로', '노동'],
        civil: ['계약', '돈', '채권', '소송', '합의', '손해', '배상', '미지급'],
        criminal: ['고소', '고발', '폭행', '사기', '협박', '명예훼손', '성범죄'],
        tax: ['세금', '세무', '국세청', '세무조사', '상속세', '증여세', '법인세'],
        psychology: ['스트레스', '우울', '불안', '번아웃', '힘들어', '지쳐'],
    };

    let maxScore = 0;
    let detectedCategory = 'civil';

    for (const [category, words] of Object.entries(keywords)) {
        const score = words.filter(word => text.includes(word)).length;
        if (score > maxScore) {
            maxScore = score;
            detectedCategory = category;
        }
    }

    return {
        category: detectedCategory,
        confidence: Math.min(95, 70 + maxScore * 5),
        summary: generateSummary(detectedCategory, text),
    };
};

const generateSummary = (category, text) => {
    const summaries = {
        labor: '직장 내에서 발생한 노동 관련 문제로 보입니다. 노무사의 전문적인 조언이 도움이 될 수 있습니다.',
        civil: '계약이나 금전 관련 분쟁으로 보입니다. 민사 전문 변호사와 상담하시면 해결 방안을 찾을 수 있습니다.',
        criminal: '형사적 대응이 필요할 수 있는 상황입니다. 형사 전문 변호사의 조언이 필요합니다.',
        tax: '세금 관련 문제로 보입니다. 세무사와의 상담을 통해 적절한 대응 방안을 모색할 수 있습니다.',
        psychology: '심리적 지원이 필요한 상황으로 보입니다. 전문 상담사와의 대화가 도움이 될 것입니다.',
    };
    return summaries[category];
};

export default function ClassificationPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { problemDescription, classification, isClassifying } = useSelector(state => state.consultation);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (!problemDescription) {
            navigate('/');
            return;
        }

        // Simulate AI classification
        const timer = setTimeout(() => {
            const result = classifyProblem(problemDescription);
            dispatch(setClassification(result));

            // Filter similar reviews
            const similarReviews = reviews.filter(r => {
                const cat = categories[result.category];
                return cat && r.caseType.includes(cat.description?.split(',')[0] || '');
            }).slice(0, 3);

            if (similarReviews.length === 0) {
                dispatch(setSimilarCases(reviews.slice(0, 3)));
            } else {
                dispatch(setSimilarCases(similarReviews));
            }

            setShowResult(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, [problemDescription, dispatch, navigate]);

    const handleContinue = () => {
        dispatch(setCurrentStep(3));
        navigate('/experts');
    };

    const categoryInfo = classification ? categories[classification.category] : null;

    const categoryColorClasses = {
        labor: 'from-orange-500 to-amber-500',
        civil: 'from-blue-500 to-cyan-500',
        criminal: 'from-red-500 to-pink-500',
        tax: 'from-green-500 to-emerald-500',
        psychology: 'from-purple-500 to-violet-500',
    };

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-6">

                {/* Loading State */}
                {!showResult && (
                    <div className="text-center py-20 animate-fade-in">
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-lavender flex items-center justify-center animate-pulse-glow">
                            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">AI가 분석 중이에요</h2>
                        <p className="text-gray-400">당신의 상황을 이해하고 있어요...</p>
                    </div>
                )}

                {/* Result */}
                {showResult && classification && categoryInfo && (
                    <div className="animate-fade-in">
                        {/* Empathy Message */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                이건 당신 잘못이 아닐 수도 있어요
                            </h1>
                            <p className="text-lg text-gray-400">
                                전문가의 시선으로 한번 볼까요?
                            </p>
                        </div>

                        {/* Classification Result */}
                        <Card variant="glass" className="p-8 mb-8">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {/* Category Icon */}
                                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${categoryColorClasses[classification.category]} flex items-center justify-center text-5xl shadow-xl`}>
                                    {categoryInfo.icon}
                                </div>

                                {/* Category Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <Badge color={categoryInfo.color} size="lg" icon={categoryInfo.icon}>
                                            {categoryInfo.name} 문제
                                        </Badge>
                                        <span className="text-sm text-gray-400">
                                            {classification.confidence}% 확신
                                        </span>
                                    </div>
                                    <p className="text-gray-300 mb-4">
                                        {classification.summary}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        💡 {categoryInfo.expertType}의 전문적인 도움을 받아보세요
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Original Problem */}
                        <Card variant="default" className="p-6 mb-8">
                            <h3 className="text-sm font-medium text-gray-400 mb-3">당신이 적어주신 내용</h3>
                            <p className="text-white leading-relaxed">"{problemDescription}"</p>
                        </Card>

                        {/* Similar Cases */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-white mb-6">
                                비슷한 상황에서 도움받은 분들의 이야기
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {reviews.slice(0, 3).map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <Button
                                variant="accent"
                                size="lg"
                                onClick={handleContinue}
                                className="px-12"
                            >
                                전문가 추천받기
                            </Button>
                            <p className="text-sm text-gray-500 mt-4">
                                * 3명의 맞춤 전문가를 무료로 추천해 드려요
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
