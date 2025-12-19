import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export function PriceAnchorPanel({ onConfirm }) {
    return (
        <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 h-full">
            <h3 className="font-bold text-gray-900 mb-6">결제 상세</h3>

            {/* Price Anchoring */}
            <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl opacity-60 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                    <div className="text-left">
                        <p className="text-xs font-bold text-gray-400 uppercase">Average Market Price</p>
                        <p className="font-medium text-gray-500 line-through">업계 평균 착수금</p>
                    </div>
                    <span className="text-lg font-bold text-gray-400 line-through">₩ 3,300,000+</span>
                </div>

                <div className="relative p-5 bg-white border-2 border-primary rounded-xl shadow-lg shadow-primary/10 overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                        RISK FREE
                    </div>
                    <div className="flex items-center justify-between mb-1">
                        <div>
                            <p className="text-xs font-bold text-primary mb-0.5">Takweol Special Offer</p>
                            <p className="font-bold text-gray-900 text-lg">15분 초두 진단</p>
                        </div>
                        <span className="text-3xl font-extrabold text-gray-900">₩ 50,000</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                        사건의 핵심 쟁점을 파악하고 승소 가능성을 진단받는 비용입니다.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
                        {["전문가 1:1 매칭", "진단 리포트 제공", "불만족 시 100% 환불"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                <Check className="w-3.5 h-3.5 text-primary" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Escrow Badge */}
            <div className="flex items-start gap-3 bg-secondary/10 p-4 rounded-xl border border-secondary/20">
                <ShieldCheck className="w-5 h-5 text-secondary shrink-0" />
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">안심 에스크로 결제</h4>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">
                        상담이 완료될 때까지 결제 금액은 탁월이 안전하게 보관합니다.
                        전문가의 노쇼(No-Show) 발생 시 즉시 환불됩니다.
                    </p>
                </div>
            </div>

            <Button
                size="lg"
                className="w-full mt-6 text-lg py-4 shadow-xl shadow-primary/20"
                onClick={onConfirm}
            >
                50,000원 결제하고 예약하기
            </Button>
        </div>
    );
}
