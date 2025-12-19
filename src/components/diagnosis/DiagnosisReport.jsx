import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export function DiagnosisReport() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 mb-8"
        >
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">AI 법률 진단 리포트</h2>
                        <p className="text-sm text-gray-500">입력하신 내용을 바탕으로 분석된 결과입니다.</p>
                    </div>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    Reference #2394A
                </span>
            </div>

            <div className="space-y-6">
                {/* Classification */}
                <div className="bg-red-50/50 rounded-xl p-5 border border-red-100 flex gap-4 items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                            이 사안은 <span className="text-red-600 font-bold border-b-2 border-red-100">직장 내 괴롭힘</span>에 해당할 확률이 높습니다.
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            상사의 폭언 및 공개적인 모욕 행위는 근로기준법 제76조 2항 위반 소지가 다분하며,
                            특히 '반복성'과 '고의성'이 입증될 경우 위자료 청구가 가능할 것으로 보입니다.
                        </p>
                    </div>
                </div>

                {/* 3-Line Summary */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">KEY FINDINGS</h4>
                    <ul className="space-y-3">
                        {[
                            "회식 자리에서의 공개적인 욕설 (명예훼손/모욕 성립 가능)",
                            "업무 시간 외 지속적인 카톡 지시 (사생활 침해)",
                            "인사 고과 불이익 협박 (직권 남용)"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
