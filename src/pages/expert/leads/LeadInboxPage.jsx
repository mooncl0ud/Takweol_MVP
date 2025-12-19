import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreHorizontal, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

const MOCK_LEADS = [
    {
        id: "L-2401",
        name: "홍길동",
        issue: "직장 내 괴롭힘 및 부당 인사발령",
        summary: "팀장의 지속적인 폭언과 야근 강요 녹취록 확보됨. 인사기록상 불이익 처분 확인.",
        winPossibility: 85,
        status: "New",
        time: "10분 전",
        tags: ["증거확보", "형사소송가능"]
    },
    {
        id: "L-2398",
        name: "이민정",
        issue: "프리랜서 임금 체불 건",
        summary: "계약서 미작성 상태이나 업무 지시 이메일 다수 존재. 근로자성 인정 여부가 쟁점.",
        winPossibility: 60,
        status: "Reviewing",
        time: "2시간 전",
        tags: ["계약서없음", "3.3%소득자"]
    }
];

function LeadCard({ lead }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2 items-center">
                    <span className="font-bold text-gray-900">{lead.name}님</span>
                    {lead.status === "New" && (
                        <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[10px] font-bold rounded-full flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> NEW
                        </span>
                    )}
                </div>
                <span className="text-secondary text-sm font-bold flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    승소확률 {lead.winPossibility}%
                </span>
            </div>

            <h4 className="font-semibold text-gray-800 mb-2">{lead.issue}</h4>
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
                {lead.summary}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <div className="flex gap-2">
                    {lead.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md">#{tag}</span>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 H-3" /> {lead.time}
                    </span>
                    <Button size="sm" className="h-8 text-xs">상세 보기</Button>
                </div>
            </div>
        </motion.div>
    );
}

export default function LeadInboxPage() {
    return (
        <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">접수 관리 (Inbox)</h1>
                    <p className="text-gray-500 text-sm mt-1">AI가 분석한 승소 확률을 기반으로 사건을 검토하세요.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="bg-white border-gray-200 text-gray-600">
                        <Filter className="w-4 h-4 mr-2" /> 필터
                    </Button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="사건 검색..."
                            className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                </div>
            </div>

            {/* AI Insight Summary Banner */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white mb-8 shadow-xl flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                        <AlertCircle className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">오늘의 중요 사건 알림</h3>
                        <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
                            <strong className="text-white">'홍길동'</strong> 님의 건은 증거 확보 상태가 매우 양호(승소확률 85%)하여,
                            즉시 수임 제안 시 성사율이 높을 것으로 예상됩니다.
                        </p>
                    </div>
                </div>
                <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                    바로 검토하기
                </Button>
            </div>

            {/* Leads Grid */}
            <div className="grid grid-cols-1 gap-4">
                {MOCK_LEADS.map(lead => (
                    <LeadCard key={lead.id} lead={lead} />
                ))}
            </div>
        </div>
    );
}
