import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Star, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function ExpertCard({ name, cases, rating, reason, tags, delay, onBook }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay, duration: 0.4 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
        >
            {/* Header: Reasoning */}
            <div className="bg-primary/5 px-6 py-3 border-b border-primary/5 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary">{reason}</span>
            </div>

            <div className="p-6">
                <div className="flex gap-5">
                    {/* Profile Image Area */}
                    <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                            <img src={`https://i.pravatar.cc/150?u=${name}`} alt={name} className="w-full h-full object-cover" />
                        </div>
                        {/* Similar Cases Badge (High Priority) */}
                        <div className="absolute -bottom-3 -right-2 bg-white border border-secondary text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            {cases}건 해결
                        </div>
                    </div>

                    {/* Info Area */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{name} 변호사</h3>
                                <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium text-gray-900">{rating}</span>
                                    <span className="text-gray-300">|</span>
                                    <span>법무법인 탁월</span>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {tags.map((tag, i) => (
                                <span key={i} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action */}
                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                        <span className="font-semibold text-gray-900">15분</span> 초두 상담 가능
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:bg-blue-50 p-0 h-auto hover:underline font-semibold"
                        onClick={onBook}
                    >
                        프로필 보기 <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
