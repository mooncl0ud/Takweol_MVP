import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { reviews, experts, categories } from '../data/mockData';

export default function ExpertListPage() {
    const navigate = useNavigate();
    const { classification } = useSelector(state => state.consultation);

    // Filter experts based on classification (Same logic)
    const recommendedExperts = useMemo(() => {
        if (!classification) return experts.slice(0, 3);

        const matchingExperts = experts.filter(expert => {
            if (classification.category === 'labor' && expert.title === '노무사') return true;
            if (classification.category === 'civil' && expert.title === '변호사') return true;
            if (classification.category === 'criminal' && expert.title === '변호사') return true;
            if (classification.category === 'tax' && expert.title === '세무사') return true;
            if (classification.category === 'psychology' && expert.title === '심리상담사') return true;
            return false;
        });

        return matchingExperts.length > 0 ? matchingExperts.slice(0, 3) : experts.slice(0, 3);
    }, [classification]);

    const categoryInfo = classification ? categories[classification.category] : categories.civil;

    const handleConsultRequest = (expertName) => {
        // Payment removed, just a simple interaction
        alert(`${expertName}님께 상담을 신청했습니다.\n전문가가 곧 연락드릴 예정입니다.`);
    };

    return (
        <div className="min-h-screen bg-[#f2f4f6] pt-20 pb-12">
            <div className="max-w-xl mx-auto px-5">

                {/* Header - Simple & Clean */}
                <div className="mb-8 pt-4">
                    <div className="inline-block px-3 py-1 bg-white rounded-[8px] shadow-sm mb-3">
                        <span className={`text-sm font-bold text-${categoryInfo?.color || 'blue'}-500`}>
                            {categoryInfo?.name || '맞춤'} 전문가 추천
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                        해결을 도와줄<br />
                        가장 적합한 전문가예요
                    </h1>
                </div>

                {/* Expert List - Vertical Stack for Mobile */}
                <div className="space-y-6">
                    {recommendedExperts.map((expert, index) => (
                        <div key={expert.id} className="relative">
                            {/* Expert Card */}
                            <Card
                                className="bg-white border-0 shadow-soft overflow-hidden p-0"
                                hover={true}
                            >
                                {/* Ranking Badge (Optional, lighter style) */}
                                {index === 0 && (
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-[12px] z-10">
                                        BEST MATCH
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-[24px] bg-gray-50 flex items-center justify-center text-3xl shrink-0">
                                            {expert.name.slice(0, 1)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-xl font-bold text-gray-900 truncate">{expert.name} {expert.title}</h3>
                                                <span className="text-yellow-500 text-sm font-bold">★ {expert.rating}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                                {expert.specialties.slice(0, 3).map((s, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs font-bold rounded-[6px]">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recent Review Snippet */}
                                    <div className="bg-gray-50 rounded-[16px] p-3 mb-4">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 rounded">유사사례</span>
                                            <span className="text-xs text-gray-400">최근 해결 후기</span>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            "{reviews.find(r => r.expertId === expert.id)?.comment}"
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">예상 수임료 (시간당)</p>
                                            <p className="text-lg font-bold text-gray-900">{expert.hourlyRate.toLocaleString()}원~</p>
                                        </div>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="px-6 rounded-[14px]"
                                            onClick={() => handleConsultRequest(expert.name)}
                                        >
                                            상담 신청
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <p className="text-center text-gray-400 text-xs mt-10 mb-8 font-medium">
                    전문가의 답변은 평일 기준 평균 1시간 내 도착합니다.
                </p>

            </div>
        </div>
    );
}
