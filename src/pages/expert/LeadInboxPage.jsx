import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { categories } from '../../data/mockData';

// Mock leads data
const mockLeads = [
    {
        id: 1,
        clientName: '의뢰인 A',
        category: 'labor',
        status: 'new', // new, accepted, rejected
        createdAt: '2024-12-19 10:30',
        narrative: '입사한 지 2년이 된 회사에서 상사로부터 지속적인 언어폭력을 당하고 있습니다. "쓸모없다", "그만둬라" 등의 발언을 반복적으로 들었고, 최근에는 업무에서 배제되어 창고 정리만 시키고 있습니다. 정신적으로 너무 힘들어서 출근이 두려운 상황입니다.',
        // AI Summary
        aiSummary: {
            keyIssues: ['상사의 반복적 언어폭력', '업무 배제 (창고 정리만 배치)', '정신적 고통으로 출근 기피'],
            evidence: ['언어폭력 발언 (상세 내용 있음)', '업무 변경 기록 확인 필요'],
            winRate: 78,
            urgency: 'high',
            recommendedActions: ['증거 수집 조언', '내용증명 발송', '고용노동부 진정'],
        },
    },
    {
        id: 2,
        clientName: '의뢰인 B',
        category: 'labor',
        status: 'new',
        createdAt: '2024-12-19 09:15',
        narrative: '퇴사 후 밀린 월급 3개월치와 퇴직금을 받지 못했습니다. 회사에서는 경영 어려움을 이유로 계속 미루고 있고, 연락도 잘 받지 않습니다.',
        aiSummary: {
            keyIssues: ['임금 체불 (3개월)', '퇴직금 미지급', '사업주 연락 회피'],
            evidence: ['근로계약서', '급여명세서 (확인 필요)', '퇴직 관련 서류'],
            winRate: 92,
            urgency: 'medium',
            recommendedActions: ['체불 금액 확인', '고용노동부 신고', '지급명령 신청'],
        },
    },
    {
        id: 3,
        clientName: '의뢰인 C',
        category: 'labor',
        status: 'accepted',
        createdAt: '2024-12-18 14:00',
        narrative: '회사에서 갑자기 구조조정을 이유로 해고 통보를 받았습니다...',
        aiSummary: {
            keyIssues: ['부당해고 가능성', '해고 절차 문제'],
            evidence: ['해고 통보서'],
            winRate: 65,
            urgency: 'high',
            recommendedActions: ['해고 사유 검토', '노동위원회 구제 신청'],
        },
    },
];

// AI Lead Summary Card
const LeadSummaryCard = ({ lead, onAccept, onReject }) => {
    const categoryInfo = categories[lead.category];
    const [expanded, setExpanded] = useState(false);

    const urgencyColors = {
        high: 'bg-red-100 text-red-700',
        medium: 'bg-yellow-100 text-yellow-700',
        low: 'bg-green-100 text-green-700',
    };

    return (
        <Card className="p-0 overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">
                        {categoryInfo?.icon || '📋'}
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">{lead.clientName}</p>
                        <p className="text-xs text-gray-400">{lead.createdAt}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColors[lead.aiSummary.urgency]}`}>
                        {lead.aiSummary.urgency === 'high' ? '긴급' : lead.aiSummary.urgency === 'medium' ? '보통' : '낮음'}
                    </span>
                    {lead.status === 'new' && (
                        <Badge variant="primary">NEW</Badge>
                    )}
                </div>
            </div>

            {/* AI Summary - 30초 읽기 */}
            <div className="p-4 bg-blue-50/50">
                <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-bold text-blue-700">AI 30초 요약</span>
                </div>

                {/* Key Issues */}
                <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">핵심 쟁점</p>
                    <ul className="space-y-1">
                        {lead.aiSummary.keyIssues.map((issue, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                {issue}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Evidence */}
                <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">증거 유무</p>
                    <div className="flex flex-wrap gap-1">
                        {lead.aiSummary.evidence.map((item, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-white rounded text-xs text-gray-600">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Win Rate */}
                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-xs text-gray-500">예상 승소율</p>
                        <p className="text-lg font-bold text-primary-600">{lead.aiSummary.winRate}%</p>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${lead.aiSummary.winRate}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Expandable Full Narrative */}
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-sm text-primary-600 hover:underline flex items-center gap-1"
                >
                    원본 내러티브 {expanded ? '접기' : '보기'}
                    <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {expanded && (
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
                        {lead.narrative}
                    </p>
                )}
            </div>

            {/* Actions */}
            {lead.status === 'new' && (
                <div className="p-4 border-t border-gray-100 flex gap-2">
                    <Button
                        variant="primary"
                        className="flex-1"
                        onClick={() => onAccept(lead.id)}
                    >
                        매칭 수락
                    </Button>
                    <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() => onReject(lead.id)}
                    >
                        거절
                    </Button>
                </div>
            )}

            {lead.status === 'accepted' && (
                <div className="p-4 border-t border-gray-100 bg-green-50">
                    <div className="flex items-center gap-2 text-green-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">수락됨 - 상담 일정 조율 중</span>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default function LeadInboxPage() {
    const navigate = useNavigate();
    const [leads, setLeads] = useState(mockLeads);
    const [filter, setFilter] = useState('all'); // all, new, accepted, rejected

    const handleAccept = (id) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: 'accepted' } : l));
    };

    const handleReject = (id) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: 'rejected' } : l));
    };

    const filteredLeads = leads.filter(l => {
        if (filter === 'all') return true;
        return l.status === filter;
    });

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">리드 인박스</h1>
                        <p className="text-sm text-gray-500">AI가 요약한 의뢰 내용을 확인하세요</p>
                    </div>
                    <div className="flex gap-2">
                        {['all', 'new', 'accepted'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === f
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                {f === 'all' ? '전체' : f === 'new' ? '신규' : '수락됨'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lead Cards */}
                <div className="space-y-4">
                    {filteredLeads.map(lead => (
                        <LeadSummaryCard
                            key={lead.id}
                            lead={lead}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    ))}

                    {filteredLeads.length === 0 && (
                        <Card className="p-8 text-center">
                            <div className="text-4xl mb-4">📭</div>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">
                                {filter === 'new' ? '새 리드가 없습니다' : '리드가 없습니다'}
                            </h2>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
