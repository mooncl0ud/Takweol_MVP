import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Video, Calendar, Clock, Bell, Copy, ArrowRight, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export default function BookingConfirmationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const expert = location.state?.expert || {
        name: '김철수',
        title: '변호사',
        specialty: '노동법 전문'
    };

    // Generate mock Zoom link
    const zoomLink = `https://meet.takweol.com/${Math.random().toString(36).substring(2, 10)}`;
    const bookingDate = '2024년 12월 21일 (토)';
    const bookingTime = '오후 2:00';
    const bookingRef = `TKW-${Date.now().toString(36).toUpperCase()}`;

    const copyZoomLink = () => {
        navigator.clipboard.writeText(zoomLink);
        // In production, show a toast notification
        alert('줌 링크가 복사되었습니다!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-lg mx-auto">
                {/* Success Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="flex justify-center mb-6"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">예약이 완료되었습니다!</h1>
                    <p className="text-gray-500">
                        상담 30분 전에 SMS로 알림을 보내드립니다.
                    </p>
                </motion.div>

                {/* Booking Details Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
                >
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <span className="text-xs text-gray-400">예약 번호</span>
                        <span className="text-sm font-bold text-gray-900">{bookingRef}</span>
                    </div>

                    {/* Expert Info */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center">
                            <User className="w-7 h-7 text-gray-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{expert.name} {expert.title}</h3>
                            <p className="text-sm text-gray-500">{expert.specialty}</p>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs">상담 일자</p>
                                <p className="font-medium text-gray-900">{bookingDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs">상담 시간</p>
                                <p className="font-medium text-gray-900">{bookingTime} (15분)</p>
                            </div>
                        </div>
                    </div>

                    {/* Zoom Link */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Video className="w-5 h-5 text-blue-600" />
                                <span className="font-bold text-gray-900 text-sm">화상 상담 링크</span>
                            </div>
                            <button
                                onClick={copyZoomLink}
                                className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline"
                            >
                                <Copy className="w-3.5 h-3.5" />
                                복사
                            </button>
                        </div>
                        <p className="text-sm text-blue-700 font-mono bg-white px-3 py-2 rounded-lg border border-blue-100 truncate">
                            {zoomLink}
                        </p>
                        <p className="text-xs text-blue-600 mt-2">
                            상담 시간에 위 링크로 접속해주세요.
                        </p>
                    </div>
                </motion.div>

                {/* Reminder Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-6"
                >
                    <Bell className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">알림 안내</h4>
                        <p className="text-xs text-gray-600 leading-relaxed mt-1">
                            상담 30분 전, 등록하신 휴대폰 번호로 SMS 알림이 발송됩니다.
                            이메일로도 상담 정보와 링크가 전송되었습니다.
                        </p>
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                >
                    <Button
                        size="lg"
                        className="w-full"
                        onClick={() => navigate('/')}
                    >
                        홈으로 돌아가기
                    </Button>
                    <Button
                        size="lg"
                        variant="secondary"
                        className="w-full"
                        onClick={() => navigate('/diagnosis')}
                    >
                        다른 전문가 둘러보기 <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </motion.div>

                {/* Footer Note */}
                <p className="text-center text-xs text-gray-400 mt-8">
                    문의사항이 있으시면 support@takweol.com으로 연락해주세요.
                </p>
            </div>
        </div>
    );
}
