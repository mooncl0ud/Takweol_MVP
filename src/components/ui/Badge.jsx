import React from 'react';

const colorClasses = {
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    primary: 'bg-primary-500/20 text-primary-400 border-primary-500/30',
    accent: 'bg-accent-coral/20 text-accent-coral border-accent-coral/30',
};

const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
};

export default function Badge({
    children,
    color = 'primary',
    size = 'md',
    icon,
    className = ''
}) {
    return (
        <span
            className={`
        inline-flex items-center gap-1.5
        font-medium rounded-full border
        ${colorClasses[color]}
        ${sizes[size]}
        ${className}
      `}
        >
            {icon && <span className="text-sm">{icon}</span>}
            {children}
        </span>
    );
}
