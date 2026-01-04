import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Briefcase, Award, GraduationCap, MessageSquare, User, Check, Video, Clock, ShieldCheck, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { CalendarSelector } from '../../../components/booking/CalendarSelector';

// Mock expert data - in production this would come from context or API
const EXPERT_DATA = {
    '1': {
        id: '1',
        name: '김철수',
        title: '변호사',
        firm: '법무법인 탁월',
        specialty: '노동법 전문',
        rating: 4.9,
        reviewCount: 127,
        cases: 89,
        experience: '12년',
        education: '서울대학교 법학전문대학원',
        bar: '제45회 변호사시험 합격',
        introduction: '안녕하세요, 노동법 전문 변호사 김철수입니다. 12년간 500여 건의 노동 관련 사건을 담당하며, 특히 직장 내 괴롭힘과 부당해고 사건에서 높은 승소율을 기록하고 있습니다. 의뢰인의 권리를 최우선으로 생각하며, 명확한 소통과 신속한 대응을 약속드립니다.',
        winCases: [
            { title: '대기업 직장 내 괴롭힘 손해배상', result: '1억 2천만원 배상 판결', year: '2024' },
            { title: 'IT기업 부당해고 무효 소송', result: '복직 및 밀린 급여 전액 수령', year: '2023' },
            { title: '스타트업 임금체불 사건', result: '체불 임금 + 지연이자 전액 승소', year: '2023' }
        ],
        reviews: [
            { author: '김OO', rating: 5, content: '상담부터 사건 종료까지 정말 친절하게 대해주셨습니다. 결과도 만족스럽고, 진행 상황도 꼼꼼하게 알려주셔서 안심이 됐어요.', date: '2024.03' },
            { author: '이OO', rating: 5, content: '처음 법률 상담을 받아봤는데, 어려운 용어도 쉽게 설명해주시고 제 상황에 맞는 전략을 제시해주셨습니다. 강력 추천합니다.', date: '2024.02' },
            { author: '박OO', rating: 5, content: '부당해고 사건으로 상담받았는데, 예상보다 좋은 결과를 얻었습니다. 변호사님의 전문성이 느껴졌어요.', date: '2024.01' }
        ]
    }
};

const TABS = [
    { id: 'profile', label: '프로필' },
    { id: 'cases', label: '승소 사례' },
    { id: 'reviews', label: '의뢰인 후기' }
];

export default function ExpertProfilePage() {
    const navigate = useNavigate();
    const { expertId } = useParams();
    const [activeTab, setActiveTab] = useState('profile');
    const [showBooking, setShowBooking] = useState(false);

    // Get expert data (fallback to first expert if not found)
    const expert = EXPERT_DATA[expertId] || EXPERT_DATA['1'];

    const handleBooking = () => {
        navigate('/booking/confirm', { state: { expert } });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="font-bold text-gray-900">전문가 프로필</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Expert Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
                >
                    <div className="flex gap-5">
                        {/* Profile Image */}
                        <div className="w-24 h-24 rounded-2xl bg-gray-200 flex items-center justify-center shrink-0">
                            <User className="w-12 h-12 text-gray-400" />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{expert.name} {expert.title}</h2>
                                    <p className="text-gray-500 text-sm">{expert.firm}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-gray-900">{expert.rating}</span>
                                    <span className="text-gray-400 text-sm">({expert.reviewCount})</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                    {expert.specialty}
                                </span>
                                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full flex items-center gap-1">
                                    <Briefcase className="w-3 h-3" />
                                    {expert.cases}건 해결
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                    경력 {expert.experience}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                    {activeTab === 'profile' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            {/* Introduction */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    소개
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {expert.introduction}
                                </p>
                            </div>

                            {/* Education & Career */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-primary" />
                                    학력 및 경력
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                        {expert.education}
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                        {expert.bar}
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                        {expert.firm} 파트너 변호사
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'cases' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            {expert.winCases.map((caseItem, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Award className="w-5 h-5 text-secondary" />
                                            <span className="text-xs text-gray-400">{caseItem.year}</span>
                                        </div>
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                            승소
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-1">{caseItem.title}</h4>
                                    <p className="text-sm text-primary font-medium">{caseItem.result}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'reviews' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            {expert.reviews.map((review, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <span className="font-medium text-gray-900">{review.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{review.content}</p>
                                    <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Booking Section */}
                <div className="mt-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            상담 일정 예약
                        </h3>
                        <CalendarSelector />
                    </div>
                </div>

                {/* Spacer for fixed bottom bar */}
                <div className="h-28" />
            </div>

            {/* Fixed Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs text-gray-500">15분 초두 상담</p>
                        <p className="text-xl font-bold text-gray-900">₩ 25,000</p>
                    </div>
                    <Button
                        size="lg"
                        className="flex-1 max-w-xs shadow-lg shadow-primary/20"
                        onClick={handleBooking}
                    >
                        <Video className="w-4 h-4 mr-2" />
                        상담 예약하기
                    </Button>
                </div>
            </div>
        </div>
    );
}
