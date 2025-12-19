import React from 'react';
import { Card, Badge } from './ui';

export default function ReviewCard({ review }) {
    const { clientType, similarityScore, caseType, outcome, rating, comment } = review;

    return (
        <Card variant="flat" className="p-4 rounded-[20px] mb-3 border-0 bg-gray-50" hover={false}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex gap-2 items-center">
                    <span className="text-xs font-bold text-gray-900 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
                        {clientType}
                    </span>
                    <div className="flex text-yellow-400 text-xs gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < Math.floor(rating) ? '★' : '☆'}</span>
                        ))}
                    </div>
                </div>
                <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                    나와 {similarityScore}% 유사
                </span>
            </div>

            <p className="text-sm text-gray-700 leading-snug mb-3">
                "{comment}"
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                    {outcome}
                </span>
                <span>•</span>
                <span>{caseType} 해결사례</span>
            </div>
        </Card>
    );
}
