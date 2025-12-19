import React from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '../ui/Button';

export function LayoutClient() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary tracking-tight">Takweol</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">BETA</span>
                    </div>

                    {/* Nav / Actions */}
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">로그인</Button>
                        <Button variant="secondary" size="sm" className="hidden md:flex">전문가 등록</Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 pt-16">
                <Outlet />
            </main>
        </div>
    );
}
