import React from 'react';

const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-md active:bg-primary-700',
    secondary: 'bg-primary-50 hover:bg-primary-100 text-primary-600 active:bg-primary-200',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 active:bg-gray-200',
    accent: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg active:scale-[0.98]', // Same as primary for consistency in bright theme or make it distinct if needed
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    loading = false,
    icon,
    ...props
}) {
    return (
        <button
            className={`
        inline-flex items-center justify-center gap-2
        font-bold rounded-2xl
        transition-all duration-200 ease-out
        active:scale-[0.96]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:active:scale-100
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            ) : icon}
            {children}
        </button>
    );
}
