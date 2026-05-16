'use client';
import { MarketAsset } from '@/types/finance';
import { formatCurrency, formatPercent, getPriceColor, getTrendBg } from '@/lib/utils';
import { cn } from '@/lib/utils'; 
import { ArrowUpRight, ArrowDownRight, Zap, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { useWatchlistStore } from '@/hooks/useWatchlistStore';
import { usePriceStore } from '@/hooks/usePriceStore';

function Sparkline({ isUp }: { isUp: boolean }) {
  // Use deterministic values based on isUp flag to avoid hydration mismatch
  const points = useMemo(() => {
    const data = Array.from({ length: 20 }, (_, i) => {
      // Create a deterministic pattern instead of random
      // Use a simple sine wave pattern that's consistent
      const base = 50;
      const volatility = isUp ? 15 : -15;
      // Use position in array to create a consistent pattern
      const wave = Math.sin(i * 0.5) * 10; 
      return base + (volatility * 0.5) + wave;
    });
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    return data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
  }, [isUp]);

  return (
    <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={isUp ? '#10b981' : '#f43f5e'}
          strokeWidth="2"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
}

export default function AssetCard({ asset }: { asset: MarketAsset }) {
  const isUp = asset.changePercent >= 0;
  const { starredAssets, toggleStar } = useWatchlistStore();
  const livePrice = usePriceStore((state: any) => state.prices[asset.id]);
  const isStarred = starredAssets.includes(asset.id);
  
  const priceToDisplay = livePrice !== undefined ? livePrice : asset.currentPrice;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link href={`/assets/${asset.id}`} className="block group">
        <div className={cn(
          "relative p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden",
          "bg-white/[0.03] border-white/10 hover:border-blue-500/50 hover:bg-white/[0.05] shadow-xl",
          "group-hover:shadow-blue-500/10"
        )}>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-800 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Zap size={16} fill="currentColor" />
                  </div>
              <div className="relative z-10">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{asset.type}</p>
                <h3 className="text-lg font-black text-white leading-none">{asset.symbol}</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <button 
                 onClick={(e) => {
                   e.preventDefault();
                   toggleStar(asset.id);
                 }}
                 className={cn(
                   "p-1.5 rounded-lg transition-colors relative z-10",
                   isStarred ? "text-yellow-400 bg-yellow-400/10" : "text-gray-600 hover:text-gray-400 bg-white/5"
                 )}
                 aria-label={isStarred ? "Remove from watchlist" : "Add to watchlist"}
               >
                 <Star size={14} fill={isStarred ? "currentColor" : "none"} />
               </button>
              <div className={cn("p-1.5 rounded-lg relative z-10", getTrendBg(asset.changePercent))}>
                {isUp ? <ArrowUpRight size={14} className="text-emerald-400" /> : <ArrowDownRight size={14} className="text-rose-400" />}
              </div>
            </div>
          </div>

          <div className="space-y-1 relative z-10">
            <p className={cn(
              "text-2xl font-black font-mono tracking-tight transition-colors duration-500",
              livePrice ? "text-blue-400" : "text-white"
            )}>
              {formatCurrency(priceToDisplay)}
            </p>
               <div className="flex items-center gap-2">
                 <span className={cn("text-xs font-bold px-2 py-0.5 rounded-md", getTrendBg(asset.changePercent))}>
                   <span className={getPriceColor(asset.changePercent)}>{formatPercent(asset.changePercent)}</span>
                 </span>
                 <span className="text-[10px] text-gray-500 font-medium uppercase">24H Change</span>
               </div>
          </div>
          
          <Sparkline isUp={isUp} />
        </div>
      </Link>
    </motion.div>
  );
}
