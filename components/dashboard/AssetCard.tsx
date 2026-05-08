'use client';
import { MarketAsset } from '@/types/finance';
import { formatCurrency, formatPercent, getPriceColor } from '@/lib/utils';
import { cn } from '@/lib/utils'; // <--- ADDED THIS IMPORT
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AssetCard({ asset }: { asset: MarketAsset }) {
  const isUp = asset.changePercent >= 0;

  return (
    <Link href={`/assets/${asset.id}`} className="block group">
      <div className="bg-terminal-gray p-4 rounded-lg border border-terminal-lightGray hover:border-terminal-accent transition-all duration-300 cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-400 text-xs font-mono uppercase tracking-widest">{asset.type}</p>
            <h3 className="text-lg font-bold text-white">{asset.symbol}</h3>
          </div>
          <div className={cn("p-1 rounded-full", isUp ? "bg-emerald-500/10" : "bg-rose-500/10")}>
            {isUp ? <ArrowUpRight size={16} className="text-terminal-up" /> : <ArrowDownRight size={16} className="text-terminal-down" />}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-mono font-bold text-white">
              {formatCurrency(asset.currentPrice)}
            </p>
            <p className={cn("text-xs font-mono", getPriceColor(asset.changePercent))}>
              {formatPercent(asset.changePercent)} (24h)
            </p>
          </div>
          <div className="text-gray-500 group-hover:text-terminal-accent transition-colors">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}
