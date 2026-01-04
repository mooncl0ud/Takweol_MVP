import React from 'react';
import { CalendarSelector } from '../../../components/booking/CalendarSelector';
import { PriceAnchorPanel } from '../../../components/booking/PriceAnchorPanel';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BookingPage() {
    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        // Navigate to booking confirmation with Zoom link (not ProposalPage)
        navigate('/booking/confirm');
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">돌아가기</span>
            </button>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">상담 일정 예약</h1>
                <p className="text-gray-500">원하시는 시간에 전문가와 집중적으로 대화하세요.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
                {/* Left: Calendar (Span 7) */}
                <div className="lg:col-span-7 h-full">
                    <CalendarSelector />
                </div>

                {/* Right: Payment/Anchor (Span 5) */}
                <div className="lg:col-span-5 h-full">
                    <PriceAnchorPanel onConfirm={handleConfirmBooking} />
                </div>
            </div>
        </div>
    );
}
