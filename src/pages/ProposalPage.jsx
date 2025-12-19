import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { experts } from '../data/mockData';

// Mock proposals data
const mockProposals = [
    {
        id: 1,
        expertId: 1,
        status: 'pending', // pending, accepted, rejected
        title: '직장 내 괴롭힘 해결 제안',
        summary: '상사의 언어적 폭력 및 업무 배제에 대한 법적 대응',
        hourlyRate: 120000,
        estimatedHours: 10,
        priceCap: 1500000,
        scope: [
            '사실관계 정리 및 증거물 검토',
            '내용증명 작성 및 발송',
            '고용노동부 진정서 작성',
            '회사와의 협상 대리',
            '필요시 노동위원회 구제신청',
        ],
        createdAt: '2024-12-18',
        expiresAt: '2024-12-25',
    },
    {
        id: 2,
        expertId: 2,
        status: 'pending',
        title: '용역비 미지급 손해배상 청구',
        summary: '프리랜서 용역비 3,200만원 회수를 위한 민사소송',
        hourlyRate: 180000,
        estimatedHours: 15,
        priceCap: 3000000,
        scope: [
            '계약서 및 거래 내역 검토',
            '내용증명 발송',
            '지급명령 신청',
            '민사소송 진행',
        ],
        createdAt: '2024-12-17',
        expiresAt: '2024-12-24',
    },
];

// Price Cap Visualization Component
const PriceCapVisualization = ({ hourlyRate, estimatedHours, priceCap }) => {
    const estimatedCost = hourlyRate * estimatedHours;
    const maxWidth = Math.max(estimatedCost, priceCap);
    const estimatedPercent = (estimatedCost / maxWidth) * 100;
    const capPercent = (priceCap / maxWidth) * 100;

    return (
        <div className="space-y-4">
            {/* Expected Cost Bar */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-primary-400"></div>
                        <span className="text-sm text-gray-600">예상 비용</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                        {estimatedCost.toLocaleString()}원
                    </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full transition-all duration-500"
                        style={{ width: `${estimatedPercent}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                    시간당 {hourlyRate.toLocaleString()}원 × {estimatedHours}시간
                </p>
            </div>

            {/* Price Cap Bar */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm font-bold text-green-700">최대 지불 상한선 (Price Cap)</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                        {priceCap.toLocaleString()}원
                    </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${capPercent}%` }}
                    ></div>
                </div>
            </div>

            {/* Guarantee Tooltip */}
            <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="text-sm text-green-800 leading-relaxed">
                        <strong>탁월 보증:</strong> 상한선을 초과하는 업무 시간에 대해서는 고객님께 추가 청구되지 않습니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

// E-Signature Modal
const ESignatureModal = ({ isOpen, onClose, onSign, proposal }) => {
    const [signature, setSignature] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [isSigning, setIsSigning] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleSign = () => {
        setIsSigning(true);
        setTimeout(() => {
            setIsSigning(false);
            setIsComplete(true);
            setTimeout(() => {
                onSign();
            }, 1500);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full p-0 overflow-hidden animate-slide-up">
                {isComplete ? (
                    /* Success Animation */
                    <div className="p-8 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-12 h-12 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">계약이 체결되었습니다!</h3>
                        <p className="text-gray-600">안전한 법률 서비스가 시작됩니다.</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-gray-900">전자 계약 서명</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4">
                            {/* Contract Summary */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm text-gray-500 mb-1">계약 내용</p>
                                <p className="font-bold text-gray-900">{proposal?.title}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    착수금: {((proposal?.priceCap || 0) * 0.3).toLocaleString()}원 (Price Cap의 30%)
                                </p>
                            </div>

                            {/* Signature Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    서명 (성명을 입력해주세요)
                                </label>
                                <input
                                    type="text"
                                    value={signature}
                                    onChange={(e) => setSignature(e.target.value)}
                                    placeholder="홍길동"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-center text-xl font-signature"
                                />
                            </div>

                            {/* Agreement */}
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={() => setAgreed(!agreed)}
                                    className="w-5 h-5 rounded border-gray-300 text-primary-500 mt-0.5"
                                />
                                <span className="text-sm text-gray-600 leading-relaxed">
                                    위 내용을 확인하였으며, 전자서명법에 따른 전자서명으로 계약에 동의합니다.
                                </span>
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="p-4 border-t border-gray-100">
                            <Button
                                variant="primary"
                                className="w-full py-3"
                                disabled={!signature.trim() || !agreed || isSigning}
                                onClick={handleSign}
                            >
                                {isSigning ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        서명 처리 중...
                                    </span>
                                ) : (
                                    '서명하고 계약 체결하기'
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
};

// Proposal Card (for inbox)
const ProposalCard = ({ proposal, onClick }) => {
    const expert = experts.find(e => e.id === proposal.expertId);
    const daysLeft = Math.ceil((new Date(proposal.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));

    return (
        <Card className="p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-all" onClick={onClick}>
            {/* Status Banner */}
            <div className={`px-4 py-2 text-sm font-medium ${proposal.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                    proposal.status === 'accepted' ? 'bg-green-50 text-green-700' :
                        'bg-gray-50 text-gray-500'
                }`}>
                {proposal.status === 'pending' && `📬 새 제안서 · 만료까지 ${daysLeft}일`}
                {proposal.status === 'accepted' && '✅ 계약 체결됨'}
                {proposal.status === 'rejected' && '❌ 거절됨'}
            </div>

            <div className="p-4">
                {/* Expert Info */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">
                        👤
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">{expert?.name} {expert?.title}</p>
                        <p className="text-xs text-gray-400">{proposal.createdAt} 발송</p>
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 mb-1">{proposal.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{proposal.summary}</p>

                {/* Price Preview */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                        <p className="text-xs text-gray-400">Price Cap</p>
                        <p className="font-bold text-green-600">{proposal.priceCap.toLocaleString()}원</p>
                    </div>
                    <Badge variant="secondary">상세보기 →</Badge>
                </div>
            </div>
        </Card>
    );
};

export default function ProposalPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [proposals, setProposals] = useState(mockProposals);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [showSignature, setShowSignature] = useState(false);

    // If ID is provided, show detail view
    useEffect(() => {
        if (id) {
            const proposal = proposals.find(p => p.id === parseInt(id));
            setSelectedProposal(proposal);
        }
    }, [id, proposals]);

    const handleSign = () => {
        setShowSignature(false);
        // Update proposal status
        setProposals(prev => prev.map(p =>
            p.id === selectedProposal?.id ? { ...p, status: 'accepted' } : p
        ));
        setSelectedProposal(prev => prev ? { ...prev, status: 'accepted' } : null);
    };

    // Detail View
    if (selectedProposal) {
        const expert = experts.find(e => e.id === selectedProposal.expertId);

        return (
            <div className="min-h-screen bg-[#f2f4f6] pt-16 pb-8">
                <div className="max-w-3xl mx-auto px-4">
                    {/* Header */}
                    <div className="py-6">
                        <button
                            onClick={() => navigate('/proposals')}
                            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            제안서 목록
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Proposal Header */}
                        <Card className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                                        👤
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{expert?.name} {expert?.title}</p>
                                        <p className="text-sm text-gray-400">{expert?.experience}</p>
                                    </div>
                                </div>
                                <Badge variant={selectedProposal.status === 'accepted' ? 'success' : 'warning'}>
                                    {selectedProposal.status === 'accepted' ? '계약 체결' : '검토 대기'}
                                </Badge>
                            </div>

                            <h1 className="text-xl font-bold text-gray-900 mb-2">{selectedProposal.title}</h1>
                            <p className="text-gray-600">{selectedProposal.summary}</p>
                        </Card>

                        {/* Scope of Work */}
                        <Card className="p-5">
                            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                업무 범위 (SOW)
                            </h2>
                            <ul className="space-y-2">
                                {selectedProposal.scope.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                                        <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                            {idx + 1}
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Price Cap Visualization */}
                        <Card className="p-5">
                            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                비용 안내
                            </h2>
                            <PriceCapVisualization
                                hourlyRate={selectedProposal.hourlyRate}
                                estimatedHours={selectedProposal.estimatedHours}
                                priceCap={selectedProposal.priceCap}
                            />
                        </Card>

                        {/* Action */}
                        {selectedProposal.status === 'pending' && (
                            <Card className="p-5">
                                <Button
                                    variant="primary"
                                    className="w-full py-4 text-base"
                                    onClick={() => setShowSignature(true)}
                                >
                                    제안 승인 및 계약 체결하기
                                </Button>
                                <p className="text-xs text-center text-gray-400 mt-3">
                                    착수금 {((selectedProposal.priceCap) * 0.3).toLocaleString()}원 (Price Cap의 30%)이 결제됩니다.
                                </p>
                            </Card>
                        )}

                        {selectedProposal.status === 'accepted' && (
                            <Card className="p-5 bg-green-50 border-green-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-green-800">계약이 체결되었습니다</p>
                                        <p className="text-sm text-green-600">전문가가 곧 업무를 시작합니다.</p>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* E-Signature Modal */}
                    <ESignatureModal
                        isOpen={showSignature}
                        onClose={() => setShowSignature(false)}
                        onSign={handleSign}
                        proposal={selectedProposal}
                    />
                </div>
            </div>
        );
    }

    // Inbox View
    return (
        <div className="min-h-screen bg-[#f2f4f6] pt-16 pb-8">
            <div className="max-w-2xl mx-auto px-4">
                {/* Header */}
                <div className="py-6">
                    <h1 className="text-xl font-bold text-gray-900">제안서 인박스</h1>
                    <p className="text-sm text-gray-500">전문가로부터 받은 제안서를 확인하세요</p>
                </div>

                {/* Proposal List */}
                <div className="space-y-4">
                    {proposals.map(proposal => (
                        <ProposalCard
                            key={proposal.id}
                            proposal={proposal}
                            onClick={() => navigate(`/proposals/${proposal.id}`)}
                        />
                    ))}

                    {proposals.length === 0 && (
                        <Card className="p-8 text-center">
                            <div className="text-4xl mb-4">📭</div>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">아직 제안서가 없습니다</h2>
                            <p className="text-sm text-gray-500">전문가 상담 후 제안서를 받을 수 있습니다.</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
