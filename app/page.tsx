"use client";

import React from "react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Zap, Target } from 'lucide-react';
import { usePersonalization } from '@/hooks/usePersonalization';

import GlobalStats from '@/components/dashboard/GlobalStats';
import MarketGrid from '@/components/dashboard/MarketGrid';
import NewsFeed from '@/components/dashboard/NewsFeed'; // <--- NEW IMPORT

export default function HomePage() {
  const identity = usePersonalization();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* 1. The Neon Header */}
      <header className="p-6 sm:p-8 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tighter flex items-center gap-2">
            <Zap className="text-blue-500" size={20} fill="currentColor" />
            WEALTH<span className="text-blue-500">CMD</span>
          </h2>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
            {identity.isPersonalized ? `Optimized for ${identity.persona}` : 'Global Market Intelligence'}
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-gray-400 text-xs font-mono">{new Date().toDateString()}</p>
          <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-tighter">System: Online</p>
        </div>
      </header>

      <main className="p-4 sm:p-8 space-y-12 max-w-7xl mx-auto w-full">
        
        {/* 2. Personalization Banner */}
        {identity.isPersonalized && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm flex items-center gap-4"
          >
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <Target size={20} />
            </div>
            <p className="text-sm text-zinc-300">
              Welcome back. We've identified <span className="text-white font-bold">{identity.weakness}</span> as your primary leak. 
              Our laest market data is filtered to help you bridge the <span className="text-blue-400 font-bold">{identity.gap} point gap</span>.
            </p>
          </motion.div>
        )}

        {/* 3. Global Pulse (Stats) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 bg-blue-500 rounded-full" />
            <h3 className="text-xs font-mono uppercase text-gray-500 tracking-widest">Global Pulse</h3>
          </div>
          <GlobalStats />
        </section>

        {/* 4. Strategic Assets (Bento Grid) */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight">Strategic Assets</h3>
              <p className="text-gray-500 text-sm font-medium">Real-time performance tracking.</p>
            </div>
            <Link href="/watchlist" className="text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-widest transition-colors">
              View All →
            </Link>
          </div>
          <MarketGrid />
        </section>

        {/* 5. Intelligence Feed (THE NEW SECTION) */}
        <section className="space-y-6">
          <NewsFeed />
        </section>

        {/* 6. The Conversion Engine (Responsive Fix) */}
        <section className="relative group overflow-hidden rounded-3xl p-8 md:p-12 border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                <TrendingUp size={14} /> Strategic Growth
              </div>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
                Ready to Grow <br /> Your Wealth?
              </h3>
              <p className="text-zinc-400 text-base md:text-s l-lg max-w-md mx-auto md:mx-0 leading-relaxed">
                Stop guessing and start architecting. Move from <span className="text-white font-bold">{identity.tier || 'your current tier'}</span> to <span className="text-emerald-400 font-bold">RICH</span> using our professional-grade frameworks.
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <Link 
                href="/strategy" 
                className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] group"
              >
                Enter Strategy Hub <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <TrendingUp size={160} className="absolute -right-10 -bottom-10 text-white/[0.03] rotate-12" />
        </section>
      </main>
    </div>
  );
}
