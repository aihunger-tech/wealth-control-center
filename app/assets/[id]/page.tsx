'use client';
import { useParams } from 'next/navigation';
import { useMarketData } from '@/hooks/useMarketData';
import { cn, formatCurrency, formatPercent, getPriceColor } from '@/lib/utils';
import { ArrowLeft, TrendingUp, Activity, Globe, Newspaper } from 'lucide-react';
import Link from 'next/link';

export default function AssetDetailPage() {
  const params = useParams();
  const symbol = params.id as string;

  // We determine if it's a stock or crypto based on the symbol length or a simple check
  // For a production app, you'd have a lookup table. Here we'll assume 3-4 chars = stock, else crypto
  const type = (symbol.length <= 4 && !['bitcoin', 'ethereum', 'solana'].includes(symbol.toLowerCase())) 
               ? 'stock' : 'crypto';

  const { asset, isLoading } = useMarketData(symbol, type);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-terminal-black">
        <div className="text-terminal-accent font-mono animate-pulse">LOADING_MARKET_DATA...</div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-terminal-black p-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Asset Not Found</h2>
        <p className="text-gray-500 mb-6">The symbol "{symbol}" could not be retrieved from the API.</p>
        <Link href="/" className="bg-terminal-accent text-white px-6 py-2 rounded-lg font-bold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-terminal-gray rounded-full transition-colors text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tighter">{asset.symbol}</h1>
          <p className="text-gray-500 text-xs font-mono">{asset.type} Intelligence Feed</p>
        </div>
      </div>

      {/* Key Metrics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-terminal-gray p-6 rounded-2xl border border-terminal-lightGray">
          <p className="text-gray-500 text-xs font-mono uppercase mb-2">Current Price</p>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-mono font-bold text-white">{formatCurrency(asset.currentPrice)}</span>
            <span className={cn("text-lg font-mono font-semibold", getPriceColor(asset.changePercent))}>
              {formatPercent(asset.changePercent)}
            </span>
          </div>
        </div>

        <div className="bg-terminal-gray p-6 rounded-2xl border border-terminal-lightGray">
          <p className="text-gray-500 text-xs font-mono uppercase mb-2">24h Volume</p>
          <div className="flex items-center gap-2 text-2xl font-mono font-bold text-white">
            <Activity size={20} className="text-terminal-accent" />
            <span>{asset.volume24h ? formatCurrency(asset.volume24h) : 'N/A'}</span>
          </div>
        </div>

        <div className="bg-terminal-gray p-6 rounded-2xl border border-terminal-lightGray">
          <p className="text-gray-500 text-xs font-mono uppercase mb-2">Market Sentiment</p>
          <div className="flex items-center gap-2 text-2xl font-mono font-bold text-white">
            <TrendingUp size={20} className="text-emerald-400" />
            <span className="text-emerald-400">BULLISH</span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="bg-terminal-dark border border-terminal-lightGray rounded-2xl p-4 h-[400px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-terminal-accent text-white text-[10px] font-bold rounded cursor-pointer">1H</span>
            <span className="px-3 py-1 bg-terminal-gray text-gray-400 text-[10px] font-bold rounded cursor-pointer hover:bg-terminal-lightGray">1D</span>
            <span className="px-3 py-1 bg-terminal-gray text-gray-400 text-[10px] font-bold rounded cursor-pointer hover:bg-terminal-lightGray">1W</span>
            <span className="px-3 py-1 bg-terminal-gray text-gray-400 text-[10px] font-bold rounded cursor-pointer hover:bg-terminal-lightGray">1M</span>
          </div>
          <div className="text-gray-500 text-xs font-mono flex items-center gap-2">
            <Globe size={12} /> Live Exchange Feed
          </div>
        </div>
        
        {/* Chart Placeholder */}
        <div className="flex-1 border border-terminal-lightGray rounded-lg flex items-center justify-center bg-terminal-black/50 relative overflow-hidden">
           <div className="text-center z-10">
              <p className="text-gray-600 font-mono text-sm">Chart Rendering Engine Active</p>
              <p className="text-gray-700 text-[10px] uppercase">Interactive Candlesticks loading...</p>
           </div>
           {/* Decorative Grid background for the "Terminal" look */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                backgroundSize: '40px 40px' }} />
        </div>
      </div>

      {/* News Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-400 font-mono text-sm uppercase tracking-widest">
          <Newspaper size={16} /> Latest Intelligence
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 bg-terminal-gray border border-terminal-lightGray rounded-xl hover:border-terminal-accent transition-all cursor-pointer">
              <p className="text-white font-bold mb-2">Market Analysis: Impact of {symbol} volatility on current trends</p>
              <p className="text-gray-500 text-xs mb-4 line-clamp-2">Detailed analysis of the current price movement and potential support levels for {symbol} in the coming week...</p>
              <span className="text-terminal-accent text-[10px] font-bold uppercase">Read More →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
