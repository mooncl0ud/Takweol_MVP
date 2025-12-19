import React, { useState } from 'react';
import { PriceCapChart } from '../../../components/proposal/PriceCapChart';
import { SignaturePad } from '../../../components/proposal/SignaturePad';
import { Button } from '../../../components/ui/Button';
import { CheckCircle2, ChevronDown, FileText } from 'lucide-react';

export default function ProposalPage() {
    const [isSigned, setIsSigned] = useState(false);

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-10">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-primary text-xs font-bold mb-3">
                    제안서 #PRO-2024-001
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">법률 자문 제안서</h1>
                <p className="text-gray-500">
                    탁월이 제안하는 최적의 솔루션과 합리적인 비용을 확인하세요.
                </p>
            </div>

            {/* 1. Executive Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-400" />
                    제안 요약
                </h3>
                <ul className="space-y-3">
                    {[
                        "전담 변호사: 김철수 (노동법 전문)",
                        "예상 소요 기간: 3개월",
                        "주요 전략: 내용증명을 통한 조기 합의 유도 후 소송 진행"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 2. Price Cap (Core Feature) */}
            <div className="mb-6">
                <PriceCapChart />
            </div>

            {/* 3. Signature */}
            <div className="mb-8">
                <SignaturePad onSign={() => setIsSigned(true)} />
            </div>

            {/* Floating Bottom Bar (Mobile/Desktop) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg-up z-50">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                    <div className="hidden sm:block">
                        <p className="text-xs text-gray-500">총 예상 견적</p>
                        <p className="text-xl font-bold text-gray-900">₩ 5,500,000 <span className="text-xs font-normal text-gray-400">(VAT 별도)</span></p>
                    </div>
                    <Button
                        size="lg"
                        className="w-full sm:w-auto min-w-[200px]"
                        disabled={!isSigned}
                    >
                        {isSigned ? (
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" />
                                계약 체결 완료
                            </span>
                        ) : (
                            "서명 후 계약하기"
                        )}
                    </Button>
                </div>
            </div>

            {/* Spacer for fixed bottom bar */}
            <div className="h-24" />
        </div>
    );
}
