import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { categories } from '../../data/mockData';

// Mock leads for proposal generation
const mockLeadsForProposal = [
    {
        id: 1,
        clientName: '의뢰인 A',
        category: 'labor',
        summary: '직장 내 괴롭힘 - 상사의 언어폭력 및 업무 배제',
        status: 'pending', // pending, sent
    },
    {
        id: 2,
        clientName: '의뢰인 B',
        category: 'labor',
        summary: '임금 체불 3개월 + 퇴직금 미지급',
        status: 'pending',
    },
];

// AI Generated SOW Template
const generateSOW = (category) => {
    const templates = {
        labor: [
            '사실관계 정리 및 증거물 검토',
            '내용증명 작성 및 발송',
            '고용노동부 진정서 작성 대리',
            '회사와의 협상 대리',
            '필요시 노동위원회 구제신청',
        ],
        civil: [
            '계약서 및 관련 서류 검토',
            '상대방에 대한 내용증명 발송',
            '지급명령 또는 민사소송 진행',
            '협상 및 조정 대리',
        ],
        criminal: [
            '고소장/고발장 작성',
            '피해 사실 증거 수집 조언',
            '경찰 조사 동행',
            '합의 협상 대리',
        ],
    };
    return templates[category] || templates.labor;
};

// Price Cap Guide Component
const PriceCapGuide = ({ category }) => {
    const marketData = {
        labor: { avg: 1500000, min: 800000, max: 3000000 },
        civil: { avg: 2500000, min: 1500000, max: 5000000 },
        criminal: { avg: 3000000, min: 2000000, max: 8000000 },
        tax: { avg: 2000000, min: 1000000, max: 4000000 },
    };

    const data = marketData[category] || marketData.labor;

    return (
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="font-bold text-blue-800 text-sm mb-1">시장 데이터 기반 Price Cap 가이드</p>
                    <p className="text-sm text-blue-700">
                        해당 카테고리의 평균 Cap은 <strong>{data.avg.toLocaleString()}원</strong>입니다.
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                        범위: {data.min.toLocaleString()}원 ~ {data.max.toLocaleString()}원
                    </p>
                </div>
            </div>
        </div>
    );
};

// Proposal Builder Component
const ProposalBuilder = ({ lead, onClose, onSend }) => {
    const categoryInfo = categories[lead.category];
    const [title, setTitle] = useState(`${categoryInfo?.name || '법률'} 문제 해결 제안`);
    const [sow, setSow] = useState(generateSOW(lead.category));
    const [hourlyRate, setHourlyRate] = useState(120000);
    const [estimatedHours, setEstimatedHours] = useState(10);
    const [priceCap, setPriceCap] = useState(1500000);
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiGenerated, setAiGenerated] = useState(false);

    const handleAIGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setSow([
                ...generateSOW(lead.category),
                '결과 보고서 작성 및 전달',
            ]);
            setTitle(`${lead.summary.split('-')[0].trim()} 해결 전략 제안`);
            setIsGenerating(false);
            setAiGenerated(true);
        }, 1500);
    };

    const handleSend = () => {
        onSend({
            leadId: lead.id,
            title,
            sow,
            hourlyRate,
            estimatedHours,
            priceCap,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-0">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="font-bold text-gray-900">제안서 작성</h2>
                        <p className="text-sm text-gray-500">{lead.clientName} · {lead.summary}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 space-y-6">
                    {/* AI Generate Button */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl border border-primary-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                                🤖
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">AI 제안서 생성기</p>
                                <p className="text-xs text-gray-500">의뢰 내용과 포트폴리오를 분석하여 초안을 작성합니다</p>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            onClick={handleAIGenerate}
                            disabled={isGenerating || aiGenerated}
                        >
                            {isGenerating ? '생성 중...' : aiGenerated ? '✓ 적용됨' : 'AI로 작성'}
                        </Button>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">제안서 제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        />
                    </div>

                    {/* SOW */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">업무 범위 (SOW)</label>
                        <div className="space-y-2">
                            {sow.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        {idx + 1}
                                    </span>
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const newSow = [...sow];
                                            newSow[idx] = e.target.value;
                                            setSow(newSow);
                                        }}
                                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                                    />
                                    <button
                                        onClick={() => setSow(sow.filter((_, i) => i !== idx))}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => setSow([...sow, ''])}
                                className="text-sm text-primary-600 hover:underline"
                            >
                                + 항목 추가
                            </button>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">시간당 단가</label>
                            <input
                                type="number"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">예상 시간</label>
                            <input
                                type="number"
                                value={estimatedHours}
                                onChange={(e) => setEstimatedHours(parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">예상 비용</label>
                            <div className="px-4 py-3 rounded-xl bg-gray-50 font-bold text-gray-900">
                                {(hourlyRate * estimatedHours).toLocaleString()}원
                            </div>
                        </div>
                    </div>

                    {/* Price Cap */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price Cap (최대 지불 상한선)
                            <span className="text-green-600 ml-1">🛡️</span>
                        </label>
                        <input
                            type="number"
                            value={priceCap}
                            onChange={(e) => setPriceCap(parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none mb-3"
                        />
                        <PriceCapGuide category={lead.category} />
                    </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-gray-100 flex gap-2 sticky bottom-0 bg-white">
                    <Button variant="secondary" className="flex-1" onClick={onClose}>
                        취소
                    </Button>
                    <Button variant="primary" className="flex-1" onClick={handleSend}>
                        제안서 발송
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default function ProposalManagerPage() {
    const [leads, setLeads] = useState(mockLeadsForProposal);
    const [selectedLead, setSelectedLead] = useState(null);

    const handleSendProposal = (proposal) => {
        setLeads(prev => prev.map(l =>
            l.id === proposal.leadId ? { ...l, status: 'sent' } : l
        ));
        setSelectedLead(null);
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-gray-900">제안서 관리</h1>
                    <p className="text-sm text-gray-500">AI의 도움을 받아 제안서를 작성하고 발송하세요</p>
                </div>

                {/* Pending Proposals */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">제안서 작성 대기</h2>
                    {leads.filter(l => l.status === 'pending').map(lead => {
                        const categoryInfo = categories[lead.category];
                        return (
                            <Card key={lead.id} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">
                                        {categoryInfo?.icon || '📋'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{lead.clientName}</p>
                                        <p className="text-sm text-gray-500">{lead.summary}</p>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    onClick={() => setSelectedLead(lead)}
                                >
                                    제안서 작성
                                </Button>
                            </Card>
                        );
                    })}

                    {leads.filter(l => l.status === 'pending').length === 0 && (
                        <Card className="p-6 text-center text-gray-400">
                            작성 대기 중인 제안서가 없습니다
                        </Card>
                    )}
                </div>

                {/* Sent Proposals */}
                {leads.filter(l => l.status === 'sent').length > 0 && (
                    <div className="mt-8 space-y-4">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">발송 완료</h2>
                        {leads.filter(l => l.status === 'sent').map(lead => {
                            const categoryInfo = categories[lead.category];
                            return (
                                <Card key={lead.id} className="p-4 flex items-center justify-between bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-lg">
                                            ✓
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-700">{lead.clientName}</p>
                                            <p className="text-sm text-gray-500">{lead.summary}</p>
                                        </div>
                                    </div>
                                    <Badge variant="success">발송완료</Badge>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* Proposal Builder Modal */}
                {selectedLead && (
                    <ProposalBuilder
                        lead={selectedLead}
                        onClose={() => setSelectedLead(null)}
                        onSend={handleSendProposal}
                    />
                )}
            </div>
        </div>
    );
}
