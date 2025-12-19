import React from 'react';
import { Card, Badge, Button } from './ui';

export default function ExpertCard({ expert, onSelect, selected = false }) {
    const {
        name,
        title,
        experience,
        specialties,
        hourlyRate,
        capAmount,
        rating,
        similarCaseCount,
        responseTime,
        imageUrl,
        badges
    } = expert;

    return (
        <div className="h-full">
            <Card
                variant="default"
                className={`h-full flex flex-col items-stretch text-left border-0 shadow-card hover:shadow-float active:scale-[0.98] transition-all p-0 overflow-hidden ${selected ? 'ring-2 ring-primary-500' : ''}`}
                onClick={() => onSelect(expert)}
            >
                {/* Header Profile */}
                <div className="p-6 pb-4">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4">
                            <div className="w-14 h-14 rounded-[20px] bg-gray-100 text-2xl flex items-center justify-center">
                                {name.slice(0, 1)}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{name} {title}</h3>
                                <p className="text-sm text-gray-500">{experience}경력</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                            <span className="text-yellow-500 text-sm">★</span>
                            <span className="text-sm font-bold text-gray-800">{rating}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                        {specialties.map((s, i) => (
                            <span key={i} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Body Comparison */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-b border-gray-100 flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">유사사건</span>
                        <span className="text-sm font-bold text-primary-600">{similarCaseCount}건 해결</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">응답시간</span>
                        <span className="text-sm font-bold text-gray-800">{responseTime}</span>
                    </div>
                </div>

                {/* Footer Price & Action */}
                <div className="p-4 bg-white">
                    {/* Replaced Button logic will be handled by parent, this component is just display mostly now, 
                     but keeping the button for standalone usage if needed, or we can remove it as per the list page redesign */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-gray-400">예상 견적</p>
                            <p className="text-lg font-bold text-gray-900">
                                {hourlyRate.toLocaleString()}원<span className="text-sm font-normal text-gray-400">/시간</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
