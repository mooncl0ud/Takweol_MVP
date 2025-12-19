```
import React from 'react';
import { CalendarSelector } from '../../../components/booking/CalendarSelector';
import { PriceAnchorPanel } from '../../../components/booking/PriceAnchorPanel';
import { useNavigate } from 'react-router-dom';

export default function BookingPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
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
                <PriceAnchorPanel onConfirm={() => navigate('/proposal')} />
            </div>
        </div>
    </div>
  );
}
```
