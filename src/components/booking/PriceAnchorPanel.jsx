import React from 'react';
import { ShieldCheck, Check, Clock, Video } from 'lucide-react';
import { Button } from '../ui/Button';

export function PriceAnchorPanel({ onConfirm }) {
    return (
        <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 h-full flex flex-col">
            <h3 className="font-bold text-gray-900 mb-6">상담 예약</h3>

            {/* Initial Consultation - Primary Offer */}
            <div className="relative p-5 bg-white border-2 border-primary rounded-xl shadow-lg shadow-primary/10 overflow-hidden mb-6">
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                    RISK FREE
                </div>
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="text-xs font-bold text-primary mb-0.5">Takweol Special Offer</p>
                        <p className="font-bold text-gray-900 text-lg">15분 초두 상담</p>
                    </div>
                    <span className="text-3xl font-extrabold text-gray-900">₩ 25,000</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                    전문가와 1:1로 사건의 핵심 쟁점을 파악하고 방향을 설정하세요.
                </p>

                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    {[
                        { icon: Check, text: "전문가 1:1 화상 상담" },
                        { icon: Video, text: "Zoom 링크 즉시 발송" },
                        { icon: Clock, text: "상담 30분 전 SMS 알림" },
                        { icon: ShieldCheck, text: "불만족 시 100% 환불" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                            <item.icon className="w-3.5 h-3.5 text-primary" />
                            {item.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Spacer to push content to bottom */}
            <div className="flex-1" />

            {/* Escrow Badge */}
            <div className="flex items-start gap-3 bg-secondary/10 p-4 rounded-xl border border-secondary/20 mb-4">
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
                className="w-full text-lg py-4 shadow-xl shadow-primary/20"
                onClick={onConfirm}
            >
                25,000원 결제하고 예약하기
            </Button>
        </div>
    );
}
