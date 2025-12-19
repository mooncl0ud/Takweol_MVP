import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Check, Eraser } from 'lucide-react';
import { Button } from '../ui/Button';

export function SignaturePad({ onSign }) {
    const [signed, setSigned] = useState(false);

    const handleSign = () => {
        setSigned(true);
        if (onSign) onSign();
    };

    const handleClear = (e) => {
        e.stopPropagation();
        setSigned(false);
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">전자 서명</h3>

            <div
                onClick={!signed ? handleSign : undefined}
                className={`
                relative h-32 rounded-xl border-2 border-dashed transition-all cursor-pointer group
                ${signed
                        ? 'border-primary bg-blue-50/20'
                        : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
                    }
            `}
            >
                {!signed ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                        <PenTool className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">여기를 클릭하여 서명하세요</span>
                    </div>
                ) : (
                    <motion.div
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <span className="font-handwriting text-4xl text-gray-800 rotate-[-5deg] font-bold">
                            Hong Gil Dong
                        </span>
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-primary text-xs font-bold">
                            <Check className="w-4 h-4" />
                            Signed
                        </div>
                    </motion.div>
                )}

                {signed && (
                    <button
                        onClick={handleClear}
                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <Eraser className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="mt-3 flex items-start gap-2 text-xs text-gray-400">
                <input type="checkbox" checked={signed} readOnly className="mt-0.5 rounded border-gray-300 text-primary focus:ring-primary" />
                <span>
                    본인은 위 제안 내용을 충분히 이해하였으며, 이에 전자적으로 동의합니다.
                    (전자서명법 제3조에 의거하여 효력을 가집니다)
                </span>
            </div>
        </div>
    );
}
