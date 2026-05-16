'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculateMarketStress } from '@/lib/risk-engine';

export default function MarketStressMeter() {
  // In a real app, this would be fetched from a VIX API
  // For now, we simulate a dynamic volatility index between 10 and 50
  const volatilityIndex = useMemo(() => 24.5, []); 
  const stress = calculateMarketStress(volatilityIndex);

  const getStressColor = () => {
    if (stress.label === 'Stable') return 'text-emerald-400';
    if (stress.label === 'Volatile') return 'text-yellow-400';
    return 'text-rose-400';
  };

  const getStressBg = () => {
    if (stress.label === 'Stable') return 'bg-emerald-500/10 border-emerald-500/20';
    if (stress.label === 'Volatile') return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-rose-500/10 border-rose-500/20';
  };

  return (
    <div className="relative group overflow-hidden rounded-3xl p-6 border border-white/10 bg-white/[0.02] backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-blue-500" />
          <h3 className="text-xs font-mono uppercase text-gray-500 tracking-widest">Market Stress Index</h3>
        </div>
        <div className={cn("px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter border", getStressBg(), getStressColor())}>
          {stress.label}
        </div>
      </div>

      <div className="space-y-6">
        {/* Gauge Visual */}
        <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${volatilityIndex}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn("h-full rounded-full", 
              stress.label === 'Stable' ? 'bg-emerald-500' : 
              stress.label === 'Volatile' ? 'bg-yellow-500' : 'bg-rose-500'
            )}
          />
        </div>

        <div className="flex items-start gap-3">
          <div className={cn("p-2 rounded-lg", getStressBg())}>
            {stress.label === 'Stable' ? <CheckCircle2 size={16} className="text-emerald-400" /> : 
             stress.label === 'Volatile' ? <Activity size={16} className="text-yellow-400" /> : 
             <AlertTriangle size={16} className="text-rose-400" />}
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight">{stress.label} Market Conditions</p>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">
              {stress.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
