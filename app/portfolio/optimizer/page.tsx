'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, TrendingUp, AlertCircle, CheckCircle2, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePortfolioStore } from '@/hooks/usePortfolioStore';
import { STRATEGIES } from '@/constants/strategies';
import { calculatePortfolioGap, AllocationGap } from '@/lib/gap-analysis';
import { simulateScenario } from '@/lib/scenario-engine';
import { analyzeMarketSentiment } from '@/lib/ai-sentiment';
import { cn } from '@/lib/utils';

export default function PortfolioOptimizer() {
  const { assets } = usePortfolioStore();
  const [selectedStrategy, setSelectedStrategy] = React.useState(STRATEGIES[0].slug);
  const [scenario, setScenario] = React.useState<'bull' | 'bear' | 'stagnant' | 'none'>('none');
  const [aiInsight, setAiInsight] = React.useState<{summary: string; overall: string} | null>(null);

  const strategy = STRATEGIES.find(s => s.slug === selectedStrategy)!;
  
  const analysis = useMemo(() => {
    const targetAssets = scenario !== 'none' 
      ? simulateScenario(assets, scenario as any) 
      : assets;
    
    // Inject live prices into the gap analysis if possible
    // Since calculatePortfolioGap is synchronous, we pass the assets.
    // For true live-analysis, we'd need to resolve all prices first.
    return calculatePortfolioGap(targetAssets, strategy.portfolioExample);
  }, [assets, strategy, scenario]);

  React.useEffect(() => {
    async function fetchInsight() {
      // Use mock articles for simulation since we don't have the Full News API feed here
      const mockArticles = [
        { title: "Bitcoin adoption hits record highs among institutions" },
        { title: "Federal reserve signals caution on interest rates" },
        { title: "Tech stocks growth remains strong despite volatility" }
      ];
      const sentiment = await analyzeMarketSentiment(mockArticles);
      setAiInsight({ summary: sentiment.summary, overall: sentiment.overall });
    }
    fetchInsight();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 max-w-6xl mx-auto w-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <Link href="/portfolio" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4 text-sm font-mono">
            ← Back to Holdings
          </Link>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            <Target className="text-blue-500" /> Strategy <span className="text-blue-500">Optimizer</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
          <label className="text-[10px] font-bold uppercase text-gray-500 ml-2">Target Model:</label>
          <select 
            value={selectedStrategy} 
            onChange={(e) => setSelectedStrategy(e.target.value)}
            className="bg-black text-white text-xs font-bold rounded-lg p-2 outline-none border border-white/10 focus:border-blue-500 transition-all"
          >
            {STRATEGIES.map(s => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>
      </header>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Scenario Selector */}
         <div className="lg:col-span-3 flex items-center gap-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 backdrop-blur-sm">
           <div className="p-2 bg-blue-500 rounded-lg text-white">
             <Play size={16} fill="currentColor" />
           </div>
           <div className="flex-1">
             <p className="text-[10px] font-bold uppercase text-blue-400 tracking-widest">Market Scenario Simulation</p>
             <p className="text-xs text-zinc-400">Test how your portfolio reacts to extreme market shifts</p>
           </div>
           <div className="flex gap-2">
             {(['none', 'bull', 'bear', 'stagnant'] as const).map((s) => (
               <button
                 key={s}
                 onClick={() => setScenario(s)}
                 className={cn(
                   "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border",
                   scenario === s 
                    ? "bg-blue-500 border-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                    : "bg-black border-white/10 text-gray-500 hover:border-white/30 hover:text-white"
                 )}
               >
                 {s === 'none' ? 'Real-time' : s}
               </button>
             ))}
           </div>
         </div>

         {/* Left Column: The Gap Analysis */}
         <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white">Allocation Leakage</h3>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Real-time Deviation Analysis</span>
            </div>

            <div className="space-y-4">
              {analysis.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <AlertCircle size={40} className="mx-auto text-gray-600" />
                  <p className="text-gray-500">No holdings found to analyze.</p>
                  <Link href="/portfolio" className="text-blue-400 text-xs font-bold uppercase tracking-widest hover:underline">
                    Add Assets Now →
                  </Link>
                </div>
              ) : (
                 analysis.map((gap) => (
                   <div key={gap.asset} className="group relative p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-blue-500/30 transition-all">
                     <div className="flex items-center justify-between mb-3">
                       <span className="text-white font-bold">{gap.asset}</span>
                       <div className="flex items-center gap-3">
                         <span className="text-[10px] font-mono text-gray-500">{gap.currentPercent.toFixed(1)}% Current</span>
                         <span className="text-[10px] font-mono text-blue-400">{gap.targetPercent}% Target</span>
                       </div>
                     </div>
                     
                     <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${gap.currentPercent}%` }}
                         className={cn(
                           "h-full rounded-full transition-all duration-1000",
                           gap.action === 'BUY' ? "bg-emerald-500" : 
                           gap.action === 'SELL' ? "bg-rose-500" : "bg-blue-500"
                         )}
                       />
                     </div>
                     
                     <div className="flex justify-between items-center mt-3">
                       <div className={cn(
                         "text-[10px] font-black uppercase px-2 py-0.5 rounded",
                         gap.action === 'BUY' ? "text-emerald-400 bg-emerald-400/10" : 
                         gap.action === 'SELL' ? "text-rose-400 bg-rose-400/10" : "text-gray-400 bg-gray-400/10"
                       )}>
                         {gap.action} {Math.abs(gap.gap).toFixed(1)}%
                       </div>
                       <div className="text-right">
                         <p className="text-white font-mono text-[10px] font-bold">
                           {gap.action === 'BUY' ? `+${formatCurrency(gap.suggestedAmount)}` : 
                            gap.action === 'SELL' ? `-${formatCurrency(Math.abs(gap.suggestedAmount))}` : 
                            'Balanced'}
                         </p>
                         <span className="text-gray-600 text-[8px] font-mono uppercase">Suggested Shift</span>
                       </div>
                       <span className="text-[10px] text-gray-600 font-mono uppercase">{gap.action === 'HOLD' ? 'Balanced' : 'Adjustment Needed'}</span>
                     </div>
                   </div>
                 ))
              )}
            </div>
          </div>
        </div>

         {/* Right Column: Summary & Action */}
         <div className="space-y-6">
           <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-md">
             <h3 className="text-white font-bold mb-6 flex items-center gap-2">
               <TrendingUp size={18} className="text-blue-500" /> Optimization Insights
             </h3>
             <div className="space-y-4">
               {aiInsight && (
                 <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 animate-pulse-slow">
                   <div className="flex items-center gap-2 mb-2">
                     <Sparkles size={14} className="text-blue-400" />
                     <span className="text-blue-400 text-[10px] font-bold uppercase">AI Sentiment Engine</span>
                   </div>
                   <p className="text-zinc-300 text-xs leading-relaxed italic">
                     "{aiInsight.summary}"
                   </p>
                   <div className="mt-2 flex justify-end">
                     <span className={cn(
                       "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase",
                       aiInsight.overall === 'BULLISH' ? "bg-emerald-500/20 text-emerald-400" :
                       aiInsight.overall === 'BEARISH' ? "bg-rose-500/20 text-rose-400" : "bg-gray-500/20 text-gray-400"
                     )}>
                       {aiInsight.overall}
                     </span>
                   </div>
                 </div>
               )}
               <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                 <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Overall Alignment</p>
                 <div className="flex items-center gap-3">
                   <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500" style={{ width: '65%' }} />
                   </div>
                   <span className="text-white font-mono font-bold">65%</span>
                 </div>
               </div>
               
               <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                 <div className="flex items-center gap-2 mb-2">
                   <CheckCircle2 size={14} className="text-emerald-400" />
                   <span className="text-emerald-400 text-[10px] font-bold uppercase">Positive Delta</span>
                 </div>
                 <p className="text-zinc-300 text-xs leading-relaxed">
                   Your allocation in <span className="text-white font-bold">BTC</span> is well positioned for the current risk cycle.
                 </p>
               </div>
               
               <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                 <div className="flex items-center gap-2 mb-2">
                   <AlertCircle size={14} className="text-rose-400" />
                   <span className="text-rose-400 text-[10px] font-bold uppercase">Critical Leak</span>
                 </div>
                 <p className="text-zinc-300 text-xs leading-relaxed">
 Slightly over-exposed to <span className="text-white font-bold">Equity</span>. Consider rebalancing to the Target Model.
                 </p>
               </div>
             </div>
           </div>
           
           <Link 
             href="/strategy"
             className="block text-center w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all"
           >
             Refine Strategy Model
           </Link>
         </div>
      </div>
    </div>
  );
}
