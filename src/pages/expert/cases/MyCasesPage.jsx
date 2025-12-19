import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search, Filter, Clock, Calendar, FileText,
    MessageSquare, ChevronRight, AlertCircle, CheckCircle2,
    Timer, MoreHorizontal, User
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

const MOCK_CASES = [
    {
        id: "C-2401",
        clientName: "홍길동",
        title: "직장 내 괴롭힘 및 부당 인사발령",
        status: "진행중",
        stage: "증거수집",
        stageProgress: 40,
        startDate: "2024.01.15",
        nextAction: "녹취록 증거 정리",
        nextDeadline: "2024.01.25",
        totalFee: 5000000,
        paidFee: 2000000,
        messages: 3
    },
    {
        id: "C-2398",
        clientName: "이민정",
        title: "프리랜서 임금 체불 건",
        status: "진행중",
        stage: "소장 작성",
        stageProgress: 65,
        startDate: "2024.01.10",
        nextAction: "소장 초안 검토",
        nextDeadline: "2024.01.22",
        totalFee: 3000000,
        paidFee: 1500000,
        messages: 0
    },
    {
        id: "C-2385",
        clientName: "박서준",
        title: "부동산 계약 분쟁",
        status: "완료",
        stage: "종결",
        stageProgress: 100,
        startDate: "2023.11.05",
        nextAction: "-",
        nextDeadline: "-",
        totalFee: 8000000,
        paidFee: 8000000,
        messages: 0
    }
];

const STAGES = ["상담완료", "계약체결", "증거수집", "소장 작성", "소송진행", "종결"];

function StatusBadge({ status }) {
    const styles = {
        "진행중": "bg-blue-50 text-blue-600 border-blue-100",
        "완료": "bg-green-50 text-green-600 border-green-100",
        "보류": "bg-yellow-50 text-yellow-600 border-yellow-100"
    };

    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status] || styles["진행중"]}`}>
            {status}
        </span>
    );
}

function CaseCard({ caseData }) {
    const currentStageIndex = STAGES.indexOf(caseData.stage);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
        >
            {/* Header */}
            <div className="p-5 border-b border-gray-50">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{caseData.clientName}님</h3>
                            <span className="text-xs text-gray-400">{caseData.id}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <StatusBadge status={caseData.status} />
                        {caseData.messages > 0 && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-500 text-xs font-medium rounded-full">
                                <MessageSquare className="w-3 h-3" />
                                {caseData.messages}
                            </span>
                        )}
                    </div>
                </div>
                <h4 className="font-semibold text-gray-800">{caseData.title}</h4>
            </div>

            {/* Progress */}
            <div className="px-5 py-4 bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">진행 단계</span>
                    <span className="text-xs font-bold text-primary">{caseData.stage}</span>
                </div>
                <div className="flex gap-1">
                    {STAGES.map((stage, i) => (
                        <div
                            key={stage}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${i <= currentStageIndex
                                    ? 'bg-primary'
                                    : 'bg-gray-200'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Details */}
            <div className="p-5 grid grid-cols-2 gap-4">
                <div>
                    <span className="text-xs text-gray-400 block mb-1">다음 할 일</span>
                    <span className="text-sm font-medium text-gray-700">{caseData.nextAction}</span>
                </div>
                <div>
                    <span className="text-xs text-gray-400 block mb-1">기한</span>
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        {caseData.nextDeadline !== "-" && <Timer className="w-3.5 h-3.5 text-orange-500" />}
                        {caseData.nextDeadline}
                    </span>
                </div>
                <div>
                    <span className="text-xs text-gray-400 block mb-1">수임료</span>
                    <span className="text-sm font-medium text-gray-700">
                        {(caseData.paidFee / 10000).toLocaleString()}만원
                        <span className="text-gray-400"> / {(caseData.totalFee / 10000).toLocaleString()}만원</span>
                    </span>
                </div>
                <div>
                    <span className="text-xs text-gray-400 block mb-1">수임일</span>
                    <span className="text-sm font-medium text-gray-700">{caseData.startDate}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-3 border-t border-gray-50 flex justify-end gap-2">
                <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4 mr-1" /> 서류
                </Button>
                <Button size="sm">
                    상세보기 <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </motion.div>
    );
}

export default function MyCasesPage() {
    const [filter, setFilter] = useState("all");

    const filteredCases = MOCK_CASES.filter(c => {
        if (filter === "all") return true;
        if (filter === "active") return c.status === "진행중";
        if (filter === "completed") return c.status === "완료";
        return true;
    });

    const stats = {
        total: MOCK_CASES.length,
        active: MOCK_CASES.filter(c => c.status === "진행중").length,
        completed: MOCK_CASES.filter(c => c.status === "완료").length
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">진행 사건</h1>
                    <p className="text-gray-500 text-sm mt-1">수임한 사건들의 진행 현황을 관리하세요.</p>
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

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <button
                    onClick={() => setFilter("all")}
                    className={`p-4 rounded-xl border transition-all ${filter === "all"
                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                            : "bg-white border-gray-100 hover:border-primary/30"
                        }`}
                >
                    <div className={`text-2xl font-bold ${filter === "all" ? "text-white" : "text-gray-900"}`}>
                        {stats.total}
                    </div>
                    <div className={`text-sm ${filter === "all" ? "text-white/80" : "text-gray-500"}`}>
                        전체 사건
                    </div>
                </button>
                <button
                    onClick={() => setFilter("active")}
                    className={`p-4 rounded-xl border transition-all ${filter === "active"
                            ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                            : "bg-white border-gray-100 hover:border-blue-200"
                        }`}
                >
                    <div className={`text-2xl font-bold flex items-center gap-2 ${filter === "active" ? "text-white" : "text-blue-600"}`}>
                        {stats.active}
                        <Clock className="w-5 h-5" />
                    </div>
                    <div className={`text-sm ${filter === "active" ? "text-white/80" : "text-gray-500"}`}>
                        진행중
                    </div>
                </button>
                <button
                    onClick={() => setFilter("completed")}
                    className={`p-4 rounded-xl border transition-all ${filter === "completed"
                            ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/25"
                            : "bg-white border-gray-100 hover:border-green-200"
                        }`}
                >
                    <div className={`text-2xl font-bold flex items-center gap-2 ${filter === "completed" ? "text-white" : "text-green-600"}`}>
                        {stats.completed}
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className={`text-sm ${filter === "completed" ? "text-white/80" : "text-gray-500"}`}>
                        완료
                    </div>
                </button>
            </div>

            {/* Cases Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredCases.map(caseData => (
                    <CaseCard key={caseData.id} caseData={caseData} />
                ))}
            </div>

            {filteredCases.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">사건이 없습니다</h3>
                    <p className="text-gray-500">해당 조건의 사건이 없습니다.</p>
                </div>
            )}
        </div>
    );
}
