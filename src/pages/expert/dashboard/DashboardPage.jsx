import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, TrendingDown, Users, Briefcase,
    DollarSign, Calendar, Clock, ArrowUpRight,
    Bell, CheckCircle2, AlertCircle, ChevronRight,
    Star, Target, Zap
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

function StatCard({ title, value, change, changeType, icon: Icon, color }) {
    const colorStyles = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${colorStyles[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
                {change && (
                    <div className={`flex items-center gap-1 text-xs font-medium ${changeType === "up" ? "text-green-600" : "text-red-500"
                        }`}>
                        {changeType === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {change}
                    </div>
                )}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-sm text-gray-500">{title}</div>
        </motion.div>
    );
}

function ActivityItem({ type, title, time, status }) {
    const icons = {
        case: Briefcase,
        message: Bell,
        payment: DollarSign,
        schedule: Calendar
    };
    const Icon = icons[type] || Bell;

    const statusStyles = {
        new: "bg-blue-500",
        urgent: "bg-red-500",
        completed: "bg-green-500"
    };

    return (
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
                <p className="text-xs text-gray-400">{time}</p>
            </div>
            {status && (
                <div className={`w-2 h-2 rounded-full ${statusStyles[status]}`} />
            )}
        </div>
    );
}

function UpcomingEvent({ title, date, time, type }) {
    return (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-white rounded-lg flex flex-col items-center justify-center border border-gray-100">
                <span className="text-xs text-gray-400">{date.split('.')[1]}월</span>
                <span className="text-lg font-bold text-gray-900">{date.split('.')[2]}</span>
            </div>
            <div className="flex-1">
                <p className="font-medium text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{time}</p>
            </div>
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${type === "hearing" ? "bg-red-50 text-red-600" :
                type === "meeting" ? "bg-blue-50 text-blue-600" :
                    "bg-gray-100 text-gray-600"
                }`}>
                {type === "hearing" ? "기일" : type === "meeting" ? "상담" : "기타"}
            </span>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
                <p className="text-gray-500 text-sm mt-1">오늘의 업무 현황을 확인하세요.</p>
            </div>

            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white mb-8"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-2">안녕하세요, 김철수 변호사님 👋</h2>
                        <p className="text-gray-300 text-sm">
                            오늘 <span className="text-white font-semibold">2건</span>의 신규 사건과
                            <span className="text-white font-semibold"> 1건</span>의 기일이 예정되어 있습니다.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-xs text-gray-400">이번 달 수임</p>
                            <p className="text-2xl font-bold">12건</p>
                        </div>
                        <div className="w-px h-12 bg-gray-700" />
                        <div className="text-right">
                            <p className="text-xs text-gray-400">수임률</p>
                            <p className="text-2xl font-bold text-secondary">78%</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    title="이번 달 수익"
                    value="₩32,500,000"
                    change="+12%"
                    changeType="up"
                    icon={DollarSign}
                    color="green"
                />
                <StatCard
                    title="진행중 사건"
                    value="8건"
                    change="+2건"
                    changeType="up"
                    icon={Briefcase}
                    color="blue"
                />
                <StatCard
                    title="신규 문의"
                    value="15건"
                    change="+5건"
                    changeType="up"
                    icon={Users}
                    color="purple"
                />
                <StatCard
                    title="평균 응답시간"
                    value="2.5시간"
                    change="-30분"
                    changeType="up"
                    icon={Clock}
                    color="orange"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Activities */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Recent Activities */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="font-bold text-gray-900">최근 활동</h3>
                            <Button variant="ghost" size="sm">
                                전체보기 <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                        <div className="p-2">
                            <ActivityItem
                                type="case"
                                title="홍길동님 사건 - 증거자료 업로드됨"
                                time="10분 전"
                                status="new"
                            />
                            <ActivityItem
                                type="message"
                                title="이민정님으로부터 새 메시지"
                                time="1시간 전"
                                status="urgent"
                            />
                            <ActivityItem
                                type="payment"
                                title="박서준님 착수금 입금 완료"
                                time="3시간 전"
                                status="completed"
                            />
                            <ActivityItem
                                type="schedule"
                                title="내일 오전 10시 - 법원 기일"
                                time="예정"
                            />
                        </div>
                    </div>

                    {/* Performance */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <h3 className="font-bold text-gray-900 mb-4">이번 달 성과</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Star className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900">4.9</div>
                                <div className="text-xs text-gray-500">평균 평점</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Target className="w-6 h-6 text-green-500" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900">85%</div>
                                <div className="text-xs text-gray-500">승소율</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Zap className="w-6 h-6 text-purple-500" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900">12건</div>
                                <div className="text-xs text-gray-500">총 수임</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Schedule */}
                <div className="space-y-6">
                    {/* Upcoming Events */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="font-bold text-gray-900">다가오는 일정</h3>
                            <Button variant="ghost" size="sm">
                                <Calendar className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="p-4 space-y-3">
                            <UpcomingEvent
                                title="서울중앙지법 1심 변론기일"
                                date="2024.01.22"
                                time="오전 10:00"
                                type="hearing"
                            />
                            <UpcomingEvent
                                title="신규 의뢰인 상담"
                                date="2024.01.23"
                                time="오후 2:00"
                                type="meeting"
                            />
                            <UpcomingEvent
                                title="증거자료 제출 마감"
                                date="2024.01.25"
                                time="오후 5:00"
                                type="deadline"
                            />
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <h3 className="font-bold text-gray-900 mb-4">빠른 작업</h3>
                        <div className="space-y-2">
                            <Button variant="secondary" className="w-full justify-start">
                                <Briefcase className="w-4 h-4 mr-2" /> 신규 사건 등록
                            </Button>
                            <Button variant="secondary" className="w-full justify-start">
                                <Calendar className="w-4 h-4 mr-2" /> 일정 추가
                            </Button>
                            <Button variant="secondary" className="w-full justify-start">
                                <Bell className="w-4 h-4 mr-2" /> 알림 설정
                            </Button>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-5 border border-primary/10">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">AI 팁</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    응답 시간을 2시간 이내로 유지하면 수임률이 평균 35% 증가합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
