import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

// Sidebar Navigation for Expert
const ExpertSidebar = ({ currentPath }) => {
    const navigate = useNavigate();

    const navItems = [
        { path: '/expert', label: '대시보드', icon: '📊' },
        { path: '/expert/leads', label: '리드 인박스', icon: '📬', badge: 3 },
        { path: '/expert/schedule', label: '상담 일정', icon: '📅' },
        { path: '/expert/proposals', label: '제안서 관리', icon: '📝', badge: 1 },
        { path: '/expert/projects', label: '프로젝트', icon: '💼' },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
            {/* Expert Profile */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-lg">
                        👤
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 text-sm">김정현</p>
                        <p className="text-xs text-gray-400">노무사</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map(item => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${currentPath === item.path || (item.path !== '/expert' && currentPath.startsWith(item.path))
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <span>{item.icon}</span>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                {item.badge}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* Back to Client */}
            <div className="p-3 border-t border-gray-100">
                <button
                    onClick={() => navigate('/')}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50"
                >
                    ← 의뢰인 모드로
                </button>
            </div>
        </div>
    );
};

// Expert Layout Wrapper
export function ExpertLayout() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-[#f2f4f6] pt-16">
            <ExpertSidebar currentPath={location.pathname} />
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}

// Dashboard Page
export default function ExpertDashboard() {
    const navigate = useNavigate();

    const stats = [
        { label: '신규 리드', value: 3, change: '+2', color: 'blue' },
        { label: '예정된 상담', value: 5, change: '', color: 'green' },
        { label: '진행 중 프로젝트', value: 2, change: '', color: 'purple' },
        { label: '이번 달 수익', value: '2,850,000원', change: '+15%', color: 'orange' },
    ];

    return (
        <div className="p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">안녕하세요, 김정현 노무사님</h1>
                    <p className="text-gray-500">오늘도 좋은 하루 되세요.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {stats.map((stat, idx) => (
                        <Card key={idx} className="p-4">
                            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                                {stat.change && (
                                    <span className="text-xs font-medium text-green-500 pb-1">{stat.change}</span>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="p-5 cursor-pointer hover:shadow-lg transition-all" onClick={() => navigate('/expert/leads')}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                                📬
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">새 리드 확인하기</h3>
                                <p className="text-sm text-gray-500">3개의 새 의뢰가 대기 중입니다</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 cursor-pointer hover:shadow-lg transition-all" onClick={() => navigate('/expert/schedule')}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                                📅
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">오늘의 일정</h3>
                                <p className="text-sm text-gray-500">오후 2시 상담 예정</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
