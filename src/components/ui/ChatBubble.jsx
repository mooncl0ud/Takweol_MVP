import React, { useEffect, useState } from 'react';

export default function ChatBubble({ message, isUser = false, delay = 0, className = '' }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!isVisible) return null;

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up ${className}`}>
            <div
                className={`
          max-w-[85%] px-5 py-3 rounded-[20px] text-[15px] leading-relaxed shadow-sm
          ${isUser
                        ? 'bg-primary-500 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
                    }
        `}
            >
                {message}
            </div>
        </div>
    );
}
