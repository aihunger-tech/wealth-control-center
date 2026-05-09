'use client';
import { useParams } from 'next/navigation';
import { useMarketData } from '@/hooks/useMarketData';
import { cn, formatCurrency, formatPercent, getPriceColor } from '@/lib/utils';
import { ArrowLeft, ArrowRight, TrendingUp, Activity, Globe, Newspaper, ShieldAlert, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePersonalization } from '@/hooks/usePersonalization';

export default function AssetDetailPage() {
  const params = useParams();
  const symbol = params.id as string;
  const identity = usePersonalization();

  const type = (symbol.length <= 4 && !['bitcoin', 'ethereum', 'solana'].includes(symbol.toLowerCase())) 
               ? 'stock' : 'crypto';

  const { asset, isLoading } = useMarketData(symbol, type);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#050505] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-xs uppercase tracking-widest animate-pulse text-blue-400">Syncing Market Intelligence...</p>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#050505] p-4 text-center text-white">
        <h2 className="text-3xl font-black mb-2">Asset Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-xs">The symbol "{symbol}" is currently unavailable in our intelligence stream.</p>
        <Link href="/" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
          Return to Command Center
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-white border border-white/10">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">{asset.symbol}</h1>
          <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">{asset.type} Intelligence Stream</p>
        </div>
      </div>

      {/* 1. Key Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Current Value" value={formatCurrency(asset.currentPrice)} subValue={formatPercent(asset.changePercent)} color={getPriceColor(asset.changePercent)} />
        <MetricCard label="24h Volume" value={asset.volume24h ? formatCurrency(asset.volume24h) : 'N/A'} icon={<Activity size={16} />} />
        <MetricCard label="Sentiment" value="BULLISH" icon={<TrendingUp size={16} />} color="text-emerald-400" />
      </div>

      {/* 2. THE VALUE ENGINE (Replacing the Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Asset Intelligence Matrix (The "Value" instead of a chart) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Zap size={18} className="text-blue-500" /> Intelligence Matrix
            </h3>
            <span className="text-[10px] font-mono text-gray-500 uppercase">Live Analysis</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Metric: Risk Level */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>Risk Profile</span>
                <span className="text-orange-400">Medium-High</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-gradient-to-r from-blue-500 to-orange-500" />
              </div>
            </div>

            {/* Metric: Liquidity */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>Liquidity Score</span>
                <span className="text-emerald-400">Ultra High</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '90%' }} className="h-full bg-emerald-500" />
              </div>
            </div>

            {/* Metric: Volatility */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>Volatility Index</span>
                <span className="text-rose-400">Aggressive</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} className="h-full bg-rose-500" />
              </div>
            </div>

            {/* Metric: Stability */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>Stability Rating</span>
                <span className="text-blue-400">Core Asset</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} className="h-full bg-blue-500" />
              </div>
            </div>
          </div>

          {/* Persona Context Box */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-4 items-start">
            <div className="p-2 bg-blue-500 rounded-lg text-white shrink-0">
              <Target size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-1">Persona Match: {identity.persona}</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Based on your <span className="text-blue-400">{identity.weakness}</span>, this asset serves as a 
                strategic hedge. It is recommended to allocate 5-10% of your portfolio here to bridge your gap to the next tier.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Action Panel */}
        <div className="p-6 rounded-3 la bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ShieldAlert size={18} className="text-rose-500" /> Risk Guard
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              This asset has shown high volatility in the last 30 days. Avoid leveraging more than 2x on this position.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/strategy" className="block w-full py-4 bg-white text-black text-center font-black rounded-xl hover:scale-105 transition-transform shadow-lg shadow-white/10">
              Apply Strategy Hub
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Intelligence Feed (Clickable News) */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-gray-400 font-mono text-sm uppercase tracking-widest">
          <Newspaper size={16} /> Real-time Intelligence
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <motion.a 
              key={i} 
              href="https://google.com" // Replace with real news API link
              target="_blank"
              whileHover={{ x: 5 }}
              className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-blue-400 uppercase">Market Analysis</span>
                <span className="text-[10px] text-gray-600 font-mono">2m ago</span>
              </div>
              <p className="text-white font-bold mb-2 group-hover:text-blue-400 transition-colors">
                Analysis: How {symbol} volatility impacts the current {identity.tier} tier strategies.
              </p>
              <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                Deep dive into the institutional flow for {symbol} and why it's currently a high-conviction play for {identity.persona} types...
              </p>
              <span className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                Read Report <ArrowRight size={12} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, subValue, icon, color = "text-white" }: any) {
  return (
    <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md">
      <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">{label}</p>
      <div className="flex items-center gap-3">
        {icon && <div className="p-2 bg-black rounded-lg text-blue-400">{icon}</div>}
        <div className="flex flex-col">
          <span className="text-3xl font-black font-mono text-white leading-none">{value}</span>
          {subValue && <span className={cn("text-sm font-bold", color)}>{subValue}</span>}
        </div>
      </div>
    </div>
  );
}
