import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

// Mock schedule data
const mockSchedule = [
    {
        id: 1,
        clientName: '의뢰인 A',
        type: '초두 상담',
        date: '2024-12-20',
        time: '14:00',
        duration: 30,
        status: 'confirmed',
        notes: '직장 내 괴롭힘 건. 증거 자료 미리 검토 필요.',
    },
    {
        id: 2,
        clientName: '의뢰인 B',
        type: '초두 상담',
        date: '2024-12-20',
        time: '16:00',
        duration: 30,
        status: 'confirmed',
        notes: '임금 체불 건. 급여명세서 확인 예정.',
    },
    {
        id: 3,
        clientName: '의뢰인 C',
        type: '진행 상담',
        date: '2024-12-21',
        time: '10:00',
        duration: 60,
        status: 'pending',
        notes: '',
    },
];

// Time blocks for calendar
const timeBlocks = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

// Get next 7 days
const getWeekDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push({
            date: date.toISOString().split('T')[0],
            dayName: date.toLocaleDateString('ko-KR', { weekday: 'short' }),
            dayNum: date.getDate(),
            isToday: i === 0,
        });
    }
    return days;
};

// Schedule Event Component
const ScheduleEvent = ({ event }) => {
    const statusColors = {
        confirmed: 'bg-primary-100 border-primary-300 text-primary-700',
        pending: 'bg-yellow-100 border-yellow-300 text-yellow-700',
        completed: 'bg-gray-100 border-gray-300 text-gray-500',
    };

    return (
        <div className={`p-2 rounded-lg border-l-4 ${statusColors[event.status]} text-xs`}>
            <p className="font-bold">{event.clientName}</p>
            <p>{event.time} · {event.duration}분</p>
            <Badge variant="secondary" className="text-xs mt-1">{event.type}</Badge>
        </div>
    );
};

export default function SchedulePage() {
    const [weekDays] = useState(getWeekDays);
    const [selectedDate, setSelectedDate] = useState(weekDays[0].date);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const getEventsForDate = (dateStr) => {
        return mockSchedule.filter(e => e.date === dateStr);
    };

    const todayEvents = getEventsForDate(selectedDate);

    return (
        <div className="p-6 h-full flex flex-col">
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">상담 일정</h1>
                        <p className="text-sm text-gray-500">예정된 상담을 확인하고 관리하세요</p>
                    </div>
                    <Button variant="primary">
                        + 직접 일정 추가
                    </Button>
                </div>

                <div className="flex-1 grid grid-cols-4 gap-4">
                    {/* Calendar View (Left) */}
                    <div className="col-span-3">
                        <Card className="p-0 overflow-hidden h-full">
                            {/* Week Header */}
                            <div className="grid grid-cols-7 border-b border-gray-100">
                                {weekDays.map(day => (
                                    <button
                                        key={day.date}
                                        onClick={() => setSelectedDate(day.date)}
                                        className={`p-3 text-center transition-all ${selectedDate === day.date
                                                ? 'bg-primary-50'
                                                : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <p className="text-xs text-gray-400">{day.dayName}</p>
                                        <p className={`text-lg font-bold ${day.isToday ? 'text-primary-500' : 'text-gray-900'
                                            }`}>
                                            {day.dayNum}
                                        </p>
                                        {getEventsForDate(day.date).length > 0 && (
                                            <div className="flex justify-center gap-0.5 mt-1">
                                                {getEventsForDate(day.date).slice(0, 3).map((_, i) => (
                                                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                                                ))}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Time Grid */}
                            <div className="overflow-y-auto max-h-[500px]">
                                {timeBlocks.map(time => {
                                    const eventsAtTime = todayEvents.filter(e => e.time === time);
                                    return (
                                        <div key={time} className="flex border-b border-gray-50">
                                            <div className="w-16 py-3 text-xs text-gray-400 text-right pr-3 flex-shrink-0">
                                                {time}
                                            </div>
                                            <div className="flex-1 py-2 px-2 min-h-[60px]">
                                                {eventsAtTime.map(event => (
                                                    <div
                                                        key={event.id}
                                                        onClick={() => setSelectedEvent(event)}
                                                        className="cursor-pointer"
                                                    >
                                                        <ScheduleEvent event={event} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* Detail Panel (Right) */}
                    <div className="col-span-1">
                        {selectedEvent ? (
                            <Card className="p-4 space-y-4 animate-fade-in">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900">상담 상세</h3>
                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">의뢰인</p>
                                    <p className="font-bold text-gray-900">{selectedEvent.clientName}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">일시</p>
                                    <p className="font-medium text-gray-900">
                                        {selectedEvent.date} {selectedEvent.time} ({selectedEvent.duration}분)
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">유형</p>
                                    <Badge variant="secondary">{selectedEvent.type}</Badge>
                                </div>

                                {selectedEvent.notes && (
                                    <div>
                                        <p className="text-xs text-gray-400">사전 메모</p>
                                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg mt-1">
                                            {selectedEvent.notes}
                                        </p>
                                    </div>
                                )}

                                <div className="pt-2 space-y-2">
                                    <Button variant="primary" className="w-full">
                                        상담실 입장
                                    </Button>
                                    <Button variant="secondary" className="w-full">
                                        의뢰인 정보 보기
                                    </Button>
                                </div>
                            </Card>
                        ) : (
                            <Card className="p-6 text-center text-gray-400">
                                <div className="text-3xl mb-3">📅</div>
                                <p className="text-sm">일정을 클릭하면<br />상세 정보를 볼 수 있습니다</p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
