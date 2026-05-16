'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Link as LinkIcon, Lock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PortfolioConnect() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group overflow-hidden rounded-3xl p-8 border border-white/10 bg-gradient-to-r from-blue-600/10 via-black to-purple-600/10 backdrop-blur-xl"
    >
      {/* Background Glows */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
       <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0 p-4 rounded-2xl bg-black border border-white/10 shadow-2xl">
          <ShieldCheck size={40} className="text-blue-500" />
        </div>

        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
              <Lock size={10} /> Military Grade Encryption
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Sync Your Wealth <span className="text-blue-500">Architecture</span>
          </h3>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
            Connect your brokerage and wallet accounts to unlock hyper-personalized leakage analysis. 
            Bridge the gap between your current tier and <span className="text-white font-bold">RICH</span> with data-driven precision.
          </p>
        </div>

        <div className="flex-shrink-0 w-full md:w-auto">
          <button className="group relative flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all active:scale-95 overflow-hidden">
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            <LinkIcon size={16} />
            Connect Portfolio
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
