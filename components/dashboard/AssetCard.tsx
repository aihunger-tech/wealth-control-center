'use client';
import { MarketAsset } from '@/types/finance';
import { formatCurrency, formatPercent, getPriceColor, getTrendBg } from '@/lib/utils';
import { cn } from '@/lib/utils'; 
import { ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AssetCard({ asset }: { asset: MarketAsset }) {
  const isUp = asset.changePercent >= 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link href={`/assets/${asset.id}`} className="block group">
        <div className={cn(
          "p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 cursor-pointer",
          "bg-white/[0.03] border-white/10 hover:border-blue-500/50 hover:bg-white/[0.05] shadow-xl"
        )}>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-800 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Zap size={16} fill="currentColor" />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{asset.type}</p>
                <h3 className="text-lg font-black text-white leading-none">{asset.symbol}</h3>
              </div>
            </div>
            <div className={cn("p-1.5 rounded-lg", getTrendBg(asset.changePercent))}>
              {isUp ? <ArrowUpRight size={14} className="text-emerald-400" /> : <ArrowDownRight size={14} className="text-rose-400" />}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-2xl font-black font-mono text-white tracking-tight">
              {formatCurrency(asset.currentPrice)}
            </p>
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-bold px-2 py-0.5 rounded-md", getTrendBg(asset.changePercent))}>
                <span className={getPriceColor(asset.changePercent)}>{formatPercent(asset.changePercent)}</span>
              </span>
              <span className="text-[10px] text-gray-600 font-medium uppercase">24H Change</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
