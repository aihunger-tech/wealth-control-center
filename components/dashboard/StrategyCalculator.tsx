'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Calendar, ArrowUpCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';

export default function StrategyCalculator() {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [years, setYears] = useState(10);
  const [annualRate, setAnnualRate] = useState(8);

  const results = useMemo(() => {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    const monthly = monthlyContribution;
    const principal = initialAmount;

    const fvPrincipal = principal * Math.pow(1 + r, n);
    const fvAnnuity = monthly * ((Math.pow(1 + r, n) - 1) / r);
    
    const totalBalance = fvPrincipal + fvAnnuity;
    const totalInvested = principal + (monthly * n);
    const totalEarnings = totalBalance - totalInvested;

    return {
      totalBalance,
      totalInvested,
      totalEarnings,
    };
  }, [initialAmount, monthlyContribution, years, annualRate]);

  return (
    <section className="space-y-6" aria-labelledby="calc-title">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-blue-500 rounded-full" />
        <h3 id="calc-title" className="text-white font-bold flex items-center gap-2">
          <TrendingUp size={18} className="text-blue-500" />
          Growth Projection
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6 bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-500 uppercase tracking-widest">
                <label htmlFor="initial-inv" className="flex items-center gap-2"><DollarSign size={12} /> Initial Investment</label>
                <span className="text-white font-bold">{formatCurrency(initialAmount)}</span>
              </div>
              <input 
                id="initial-inv"
                type="range" min="0" max="100000" step="500" 
                value={initialAmount} onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                aria-label="Initial Investment Amount"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-500 uppercase tracking-widest">
                <label htmlFor="monthly-cont" className="flex items-center gap-2"><TrendingUp size={12} /> Monthly Contribution</label>
                <span className="text-white font-bold">{formatCurrency(monthlyContribution)}</span>
              </div>
              <input 
                id="monthly-cont"
                type="range" min="0" max="5000" step="50" 
                value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                aria-label="Monthly Contribution Amount"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-500 uppercase tracking-widest">
                <label htmlFor="time-horizon" className="flex items-center gap-2"><Calendar size={12} /> Time Horizon (Years)</label>
                <span className="text-white font-bold">{years} Years</span>
              </div>
              <input 
                id="time-horizon"
                type="range" min="1" max="40" step="1" 
                value={years} onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                aria-label="Investment duration in years"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-500 uppercase tracking-widest">
                <label htmlFor="annual-rate" className="flex items-center gap-2"><Zap size={12} /> Est. Annual Return</label>
                <span className="text-white font-bold">{annualRate}%</span>
              </div>
              <input 
                id="annual-rate"
                type="range" min="1" max="20" step="0.5" 
                value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                aria-label="Estimated annual return percentage"
              />
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div className="relative group overflow-hidden rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 shadow-2xl flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-1">
              <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">Projected Balance</p>
              <motion.h2 
                key={results.totalBalance}
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-4xl md:text-5xl font-black text-white tracking-tighter font-mono"
              >
                {formatCurrency(results.totalBalance)}
              </motion.h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Total Invested</p>
                <p className="text-lg font-bold text-zinc-300 font-mono">{formatCurrency(results.totalInvested)}</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-500 text-[10px] uppercase font-bold mb-1 flex items-center gap-1">
                  <ArrowUpCircle size={10} /> Total Profit
                </p>
                <p className="text-lg font-bold text-emerald-400 font-mono">{formatCurrency(results.totalEarnings)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
