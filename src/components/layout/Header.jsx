import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const isExpertPage = location.pathname.includes('/experts');

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center text-white font-bold text-lg shadow-toss">
                        T
                    </div>
                    <span className="text-xl font-extrabold text-gray-900 tracking-tight">Takweol</span>
                </div>

                {/* Navigation (Desktop) */}
                <nav className="hidden md:flex items-center gap-8">
                    <a
                        href="#"
                        className={`text-sm font-medium transition-colors ${!isExpertPage ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        문제 진단
                    </a>
                    <a
                        href="#"
                        className={`text-sm font-medium transition-colors ${isExpertPage ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                        onClick={() => navigate('/experts')}
                    >
                        전문가 찾기
                    </a>
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
                        로그인
                    </button>
                    <Button variant="primary" size="sm" className="shadow-none rounded-[14px]">
                        전문가 등록
                    </Button>
                </div>
            </div>
        </header>
    );
}
