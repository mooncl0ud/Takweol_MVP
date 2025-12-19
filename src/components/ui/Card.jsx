import React from 'react';

const variants = {
    default: 'bg-white border border-gray-100 shadow-sm',
    glass: 'bg-white/90 backdrop-blur-sm border border-white/50 shadow-sm', // Updated for bright glass
    flat: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm',
};

export default function Card({
    children,
    variant = 'default',
    className = '',
    hover = true,
    onClick,
    ...props
}) {
    return (
        <div
            className={`
        rounded-[24px] p-6
        ${variants[variant]}
        ${hover ? 'transition-transform duration-200 active:scale-[0.98]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
}
