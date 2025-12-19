import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const variants = {
    primary: 'bg-primary text-white shadow-soft-deep hover:bg-primary-hover border border-transparent',
    secondary: 'bg-white text-text-sub border border-gray-200 hover:border-primary/30 hover:text-primary shadow-sm',
    accent: 'bg-secondary text-white shadow-soft-deep hover:bg-secondary-hover border border-transparent',
    ghost: 'bg-transparent text-text-sub hover:bg-gray-100 border-transparent',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg font-semibold',
};

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    icon: Icon,
    ...props
}) {
    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={twMerge(
                'inline-flex items-center justify-center gap-2 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {Icon && <Icon className="w-5 h-5" />}
            {children}
        </motion.button>
    );
}
