'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
}

export default function StatCard({ label, value, icon, color, borderColor }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn(
        "group bg-white/[0.03] border border-white/10 p-5 rounded-2xl backdrop-blur-md flex items-center gap-4 transition-all duration-300 cursor-default",
        "hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/20",
        borderColor
      )}
    >
      <div className={cn("p-3 rounded-xl bg-black border border-white/10 group-hover:border-white/20 transition-colors", color)}>
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">{label}</p>
        <p className="text-xl font-black font-mono text-white tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}