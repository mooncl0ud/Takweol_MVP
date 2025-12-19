import React, { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    error,
    className = '',
    multiline = false,
    rows = 4,
    ...props
}, ref) => {
    const baseClasses = `
    w-full px-4 py-3.5
    bg-gray-50 border-none rounded-[16px]
    text-gray-900 placeholder-gray-400
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white
    ${error ? 'ring-2 ring-red-500/20 bg-red-50' : ''}
    ${className}
  `;

    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                    {label}
                </label>
            )}
            {multiline ? (
                <textarea
                    ref={ref}
                    rows={rows}
                    className={`${baseClasses} resize-none`}
                    {...props}
                />
            ) : (
                <input
                    ref={ref}
                    className={baseClasses}
                    {...props}
                />
            )}
            {error && (
                <p className="text-xs text-red-500 ml-1">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
