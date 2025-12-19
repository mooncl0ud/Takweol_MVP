import React from 'react';

export default function TypingIndicator() {
    return (
        <div className="flex justify-start w-full mb-3 animate-fade-in">
            <div className="bg-white border border-gray-100 px-4 py-3 rounded-[20px] rounded-bl-sm flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            </div>
        </div>
    );
}
