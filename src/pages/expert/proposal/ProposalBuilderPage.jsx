import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Save, Users, FileText, ChevronRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export default function ProposalBuilderPage() {
    const [loading, setLoading] = useState(false);
    const [strategy, setStrategy] = useState("");

    const handleAIGenerate = () => {
        setLoading(true);
        setTimeout(() => {
            setStrategy("1. 내용증명 발송을 통한 초기 압박\n2. 노동청 진정서 접수 및 출석 조사 동행\n3. 합의 불발 시 민사상 손해배상 청구 진행");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">제안서 작성</h1>
                    <p className="text-gray-500 text-sm mt-1">AI의 도움을 받아 의뢰인에게 최적화된 제안서를 작성하세요.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary">임시 저장</Button>
                    <Button>
                        <Save className="w-4 h-4 mr-2" /> 제안서 발송
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-2 space-y-6">

                    {/* 1. Basic Info */}
                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" /> 수신자 정보
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">의뢰인</label>
                                <input type="text" value="홍길동" disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">사건 유형</label>
                                <input type="text" value="직장 내 괴롭힘" disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* 2. Strategy (AI Powered) */}
                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-400" /> 주요 전략
                            </h3>
                            <Button
                                size="sm"
                                className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none"
                                onClick={handleAIGenerate}
                                disabled={loading}
                            >
                                {loading ? (
                                    "AI 생성 중..."
                                ) : (
                                    <>
                                        <Wand2 className="w-3.5 h-3.5 mr-1" /> AI 초안 생성
                                    </>
                                )}
                            </Button>
                        </div>

                        <textarea
                            className="w-full h-40 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none leading-relaxed"
                            placeholder="AI 버튼을 눌러 초안을 생성하거나 직접 작성하세요."
                            value={strategy}
                            onChange={(e) => setStrategy(e.target.value)}
                        />

                        {loading && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                    </div>

                    {/* 3. Cost */}
                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">비용 설정 (Price Cap)</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">착수금</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₩</span>
                                    <input type="number" className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm font-bold text-gray-900" defaultValue="3300000" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-secondary mb-1">성공보수 상한선 (CAP)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm">₩</span>
                                    <input type="number" className="w-full border border-secondary/30 bg-amber-50 rounded-lg pl-8 pr-3 py-2 text-sm font-bold text-secondary" defaultValue="2200000" />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">시뮬레이션: 최대 청구 금액 5,500,000원</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Preview */}
                <div className="space-y-4">
                    <div className="bg-gray-100 rounded-xl p-6 text-center">
                        <h4 className="font-bold text-gray-500 mb-2">모바일 미리보기</h4>
                        <div className="w-[250px] h-[480px] bg-white rounded-3xl mx-auto border-4 border-gray-200 shadow-inner flex items-center justify-center text-gray-300 text-xs">
                            Screen Preview
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
