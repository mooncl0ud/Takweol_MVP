import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { experts, categories } from '../data/mockData';

// Generate available time slots
const generateTimeSlots = () => {
    const slots = [];
    const today = new Date();

    for (let day = 1; day <= 7; day++) {
        const date = new Date(today);
        date.setDate(today.getDate() + day);

        const daySlots = [];
        const hours = [10, 11, 14, 15, 16, 17, 19, 20];

        hours.forEach(hour => {
            // Random availability
            if (Math.random() > 0.3) {
                daySlots.push({
                    time: `${hour}:00`,
                    available: true,
                    isRecommended: hour === 10 && day === 1, // First slot is recommended
                });
            }
        });

        slots.push({
            date,
            dateStr: date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' }),
            slots: daySlots,
        });
    }

    return slots;
};

// Calendar Component
const CalendarPicker = ({ selectedSlot, onSelect }) => {
    const [timeSlots] = useState(generateTimeSlots);
    const [selectedDate, setSelectedDate] = useState(0);

    // Find the first recommended slot
    const recommendedSlot = timeSlots[0]?.slots?.find(s => s.isRecommended);

    return (
        <div className="space-y-4">
            {/* Date Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
                {timeSlots.map((day, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedDate(idx)}
                        className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedDate === idx
                                ? 'bg-primary-500 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        {day.dateStr}
                    </button>
                ))}
            </div>

            {/* Recommended Slot Banner */}
            {selectedDate === 0 && recommendedSlot && (
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-100">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm text-green-700 font-medium">
                        가장 빠른 상담 가능 시간: 내일 오전 10시
                    </span>
                </div>
            )}

            {/* Time Slots Grid */}
            <div className="grid grid-cols-4 gap-2">
                {timeSlots[selectedDate]?.slots.map((slot, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect({ date: timeSlots[selectedDate].dateStr, time: slot.time })}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${selectedSlot?.time === slot.time && selectedSlot?.date === timeSlots[selectedDate].dateStr
                                ? 'bg-primary-500 text-white shadow-md'
                                : slot.isRecommended
                                    ? 'bg-primary-50 text-primary-600 border-2 border-primary-300'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300'
                            }`}
                    >
                        {slot.time}
                        {slot.isRecommended && (
                            <span className="block text-xs mt-0.5 text-primary-500">추천</span>
                        )}
                    </button>
                ))}
                {timeSlots[selectedDate]?.slots.length === 0 && (
                    <div className="col-span-4 text-center py-8 text-gray-400">
                        해당 날짜에 가능한 시간이 없습니다
                    </div>
                )}
            </div>
        </div>
    );
};

// Escrow Payment Section
const EscrowPayment = ({ amount, onPay }) => {
    const [agreed, setAgreed] = useState(false);

    return (
        <Card className="p-0 overflow-hidden border-0 shadow-lg">
            {/* Price Anchoring */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">초두 상담 비용</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-primary-600">
                                {amount.toLocaleString()}원
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                                업계 평균 착수금 300만원~
                            </span>
                        </div>
                    </div>
                    <Badge variant="success" className="text-xs px-3 py-1">
                        92% 절감
                    </Badge>
                </div>

                {/* What's included */}
                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>30분 1:1 전문가 상담</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>맞춤형 해결 방안 제시</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>상담 후 정식 제안서 발송</span>
                    </div>
                </div>
            </div>

            {/* Escrow Security Badge */}
            <div className="p-4 bg-blue-50/50 border-b border-blue-100">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold text-gray-800 text-sm mb-0.5">탁월 에스크로 보장</p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            상담 완료 전까지 금액은 탁월이 안전하게 보관합니다.<br />
                            불만족 시 100% 환불 보장
                        </p>
                    </div>
                </div>
            </div>

            {/* Agreement & Payment */}
            <div className="p-4">
                <label className="flex items-start gap-3 cursor-pointer mb-4">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={() => setAgreed(!agreed)}
                        className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 mt-0.5"
                    />
                    <span className="text-sm text-gray-600 leading-relaxed">
                        결제 진행에 동의합니다. 상담 완료 후 전문가에게 금액이 지급됩니다.
                    </span>
                </label>

                <Button
                    variant="primary"
                    className="w-full py-4 text-base"
                    disabled={!agreed}
                    onClick={onPay}
                >
                    {amount.toLocaleString()}원 결제하기
                </Button>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        SSL 암호화
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        PCI 인증
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default function BookingPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [step, setStep] = useState('calendar'); // calendar, payment, complete

    const { classification } = useSelector(state => state.consultation);
    const categoryInfo = classification ? categories[classification.category] : null;

    useEffect(() => {
        const expert = experts.find(e => e.id === parseInt(id)) || experts[0];
        setSelectedExpert(expert);
    }, [id]);

    const handlePayment = () => {
        // Simulate payment processing
        setStep('complete');
    };

    if (!selectedExpert) {
        return (
            <div className="min-h-screen bg-[#f2f4f6] pt-16 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    // Payment Complete
    if (step === 'complete') {
        return (
            <div className="min-h-screen bg-[#f2f4f6] pt-16 flex items-center justify-center p-4">
                <Card className="p-8 text-center max-w-md animate-slide-up">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-10 h-10 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">예약이 완료되었습니다!</h2>
                    <p className="text-gray-600 mb-6">
                        {selectedSlot?.date} {selectedSlot?.time}<br />
                        {selectedExpert.name} {selectedExpert.title}님과의 상담이 예약되었습니다.
                    </p>
                    <div className="space-y-2">
                        <Button variant="primary" className="w-full" onClick={() => navigate('/consultation')}>
                            상담실 입장하기
                        </Button>
                        <Button variant="secondary" className="w-full" onClick={() => navigate('/')}>
                            홈으로 돌아가기
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f2f4f6] pt-16 pb-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="py-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        뒤로
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">상담 예약</h1>
                </div>

                <div className="grid lg:grid-cols-5 gap-6">
                    {/* Left: Expert Info + Calendar */}
                    <div className="lg:col-span-3 space-y-4">
                        {/* Selected Expert */}
                        <Card className="p-4 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                                {categoryInfo?.icon || '👤'}
                            </div>
                            <div className="flex-1">
                                <h2 className="font-bold text-gray-900">{selectedExpert.name}</h2>
                                <p className="text-sm text-gray-500">{selectedExpert.title} · {selectedExpert.experience}</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <span>★</span>
                                    <span className="font-bold text-gray-700">{selectedExpert.rating}</span>
                                </div>
                                <p className="text-xs text-gray-400">{selectedExpert.reviewCount}개 리뷰</p>
                            </div>
                        </Card>

                        {/* Calendar */}
                        <Card className="p-5">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                상담 시간 선택
                            </h3>
                            <CalendarPicker
                                selectedSlot={selectedSlot}
                                onSelect={(slot) => {
                                    setSelectedSlot(slot);
                                    setStep('payment');
                                }}
                            />
                        </Card>
                    </div>

                    {/* Right: Payment */}
                    <div className="lg:col-span-2">
                        {step === 'payment' && selectedSlot ? (
                            <div className="space-y-4 animate-slide-up">
                                {/* Selected Time */}
                                <Card className="p-4 bg-primary-50 border-primary-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">선택한 시간</p>
                                            <p className="font-bold text-gray-900">{selectedSlot.date} {selectedSlot.time}</p>
                                        </div>
                                        <button
                                            onClick={() => setStep('calendar')}
                                            className="ml-auto text-sm text-primary-600 hover:underline"
                                        >
                                            변경
                                        </button>
                                    </div>
                                </Card>

                                {/* Escrow Payment */}
                                <EscrowPayment
                                    amount={50000}
                                    onPay={handlePayment}
                                />
                            </div>
                        ) : (
                            <Card className="p-6 text-center text-gray-400">
                                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm">왼쪽에서 상담 시간을 선택해주세요</p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
