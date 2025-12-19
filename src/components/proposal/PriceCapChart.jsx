import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Shield } from 'lucide-react';

export function PriceCapChart() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        수임료 상한제 (Price Cap) 적용
                        <Shield className="w-5 h-5 text-secondary fill-secondary/20" />
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        추가수당 걱정 없이, 약정된 금액까지만 청구됩니다.
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-secondary font-bold text-lg">Guaranteed</span>
                </div>
            </div>

            {/* Chart Area */}
            <div className="space-y-6">
                {/* Bar 1: Market Standard (High) */}
                <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>일반적인 타임차지 방식</span>
                        <span>예측 불가</span>
                    </div>
                    <div className="h-12 w-full bg-gray-100 rounded-full overflow-hidden relative opacity-60">
                        <div className="absolute top-0 left-0 h-full w-[80%] bg-gray-300 rounded-full" />
                        <div className="absolute top-0 left-[80%] h-full w-[20%] bg-red-100 pattern-diagonal-lines" />
                        <div className="absolute inset-0 flex items-center justify-end px-4 text-gray-500 font-medium text-sm">
                            ~ 15,000,000원 + α
                        </div>
                    </div>
                </div>

                {/* Bar 2: Takweol Price Cap (Safe) */}
                <div className="relative">
                    <div className="flex justify-between text-xs font-bold text-primary mb-2">
                        <span>탁월 제안 방식</span>
                        <span className="text-secondary">상한선 확정</span>
                    </div>

                    <div className="h-14 w-full bg-blue-50/50 rounded-full overflow-hidden relative border border-primary/20">
                        {/* Base Fee */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "45%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute top-0 left-0 h-full bg-primary flex items-center justify-center text-white text-xs font-bold"
                        >
                            착수금
                        </motion.div>

                        {/* Cap Limit */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            className="absolute top-0 left-[45%] h-full w-[35%] bg-secondary flex items-center justify-center text-white text-xs font-bold"
                        >
                            성공보수 CAP
                        </motion.div>

                        <div className="absolute top-0 right-0 h-full w-[20%] bg-transparent flex items-center justify-center text-gray-400 text-xs font-medium px-4">
                            초과분 0원
                        </div>
                    </div>

                    {/* Tooltip / Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="absolute -top-2 right-[20%] translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-3 rounded-lg shadow-xl"
                    >
                        최대 550만원
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </motion.div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50 text-xs text-gray-500 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-gray-400 shrink-0" />
                <p>
                    사건 난이도에 따라 실제 업무량이 증가하더라도, 설정된 Price Cap을 초과하는 비용은
                    <strong> 전액 탁월이 부담</strong>합니다. 의뢰인은 처음 약정한 금액 이상을 지불하지 않습니다.
                </p>
            </div>
        </div>
    );
}
