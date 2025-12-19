import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Inbox, FileText, Settings, LogOut, Briefcase, User } from 'lucide-react';
import { clsx } from 'clsx';

function SidebarItem({ to, icon: Icon, label, alert }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            )}
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium text-sm flex-1">{label}</span>
            {alert && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {alert}
                </span>
            )}
        </NavLink>
    );
}

export function LayoutExpert() {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 left-0 z-50">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black">T</div>
                        <span className="font-bold text-gray-900 tracking-tight">Takweol <span className="text-xs font-normal text-gray-400">Expert</span></span>
                    </div>

                    <div className="space-y-1">
                        <SidebarItem to="/expert/inbox" icon={Inbox} label="접수 관리" alert="2" />
                        <SidebarItem to="/expert/cases" icon={Briefcase} label="진행 사건" />
                        <SidebarItem to="/expert/drafts" icon={FileText} label="제안서 관리" />
                        <SidebarItem to="/expert/dashboard" icon={LayoutDashboard} label="대시보드" />
                    </div>
                </div>

                <div className="mt-auto p-6 border-t border-gray-50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">김철수 변호사</p>
                            <p className="text-xs text-gray-500">법무법인 탁월</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-xs font-medium">
                        <Settings className="w-4 h-4" />
                        <span>설정</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
}
