import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const DATES = [
    { day: "오늘", date: "12.20", available: true },
    { day: "내일", date: "12.21", available: true },
    { day: "모레", date: "12.22", available: true },
    { day: "월", date: "12.23", available: false },
    { day: "화", date: "12.24", available: true },
];

const TIME_SLOTS = [
    { time: "10:00", available: false },
    { time: "11:30", available: true, rec: true }, // Recommended
    { time: "14:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: false },
    { time: "17:30", available: true },
];

export function CalendarSelector() {
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedTime, setSelectedTime] = useState(null);

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                상담 일정 선택
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight className="w-4 h-4" /></button>
                </div>
            </h3>

            {/* Date Strip */}
            <div className="flex justify-between mb-6 border-b border-gray-50 pb-4">
                {DATES.map((d, i) => (
                    <button
                        key={i}
                        onClick={() => d.available && setSelectedDate(i)}
                        disabled={!d.available}
                        className={`flex flex-col items-center justify-center min-w-[3.5rem] py-2 rounded-xl transition-all
                    ${selectedDate === i
                                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                                : d.available
                                    ? 'hover:bg-blue-50 text-gray-600'
                                    : 'opacity-30 cursor-not-allowed text-gray-300'
                            }
                  `}
                    >
                        <span className="text-xs font-medium opacity-80">{d.day}</span>
                        <span className={`text-lg font-bold ${selectedDate === i ? 'text-white' : 'text-gray-900'}`}>{d.date}</span>
                    </button>
                ))}
            </div>

            {/* Time Grid */}
            <div className="grid grid-cols-3 gap-3">
                {TIME_SLOTS.map((slot, i) => (
                    <motion.button
                        key={i}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`relative py-3 rounded-lg border text-sm font-semibold transition-all
                        ${!slot.available
                                ? 'bg-gray-50 border-transparent text-gray-300 decoration-slice line-through'
                                : selectedTime === slot.time
                                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                                    : 'border-gray-100 text-gray-700 hover:border-primary/50 hover:text-primary'
                            }
                    `}
                    >
                        {slot.time}
                        {slot.rec && slot.available && selectedTime !== slot.time && (
                            <span className="absolute -top-2 -right-1 bg-secondary text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">
                                추천
                            </span>
                        )}
                    </motion.button>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-center text-xs text-gray-400 gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>모든 시간은 한국 표준시(KST) 기준입니다.</span>
            </div>
        </div>
    );
}
