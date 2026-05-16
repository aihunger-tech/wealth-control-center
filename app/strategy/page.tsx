'use client';
import Link from 'next/link';
import { STRATEGIES } from '@/constants/strategies';
import { TrendingUp, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import MarketStressMeter from '@/components/dashboard/MarketStressMeter';

export default function StrategyPage() {
  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white mb-2">Investment Playbooks</h1>
          <p className="text-gray-400 font-mono text-sm">
            Select a strategy based on your risk tolerance and time horizon.
          </p>
        </div>
        
        <div className="w-full md:w-80">
          <MarketStressMeter />
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STRATEGIES.map((strat) => (
          <Link key={strat.id} href={`/strategy/${strat.slug}`} className="group">
            <div className="h-full bg-terminal-gray border border-terminal-lightGray p-6 rounded-2xl hover:border-terminal-accent transition-all duration-300 flex flex-col">
              <div className="mb-4 p-3 bg-terminal-black rounded-lg w-fit text-terminal-accent group-hover:scale-110 transition-transform">
                {strat.riskLevel === 'Low' ? <ShieldCheck size={28} /> : 
                 strat.riskLevel === 'Medium' ? <TrendingUp size={28} /> : <Zap size={28} />}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">{strat.title}</h3>
              <p className="text-gray-400 text-sm flex-1 leading-relaxed">{strat.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-terminal-lightGray">
                <span className={cn(
                  "text-[10px] font-bold uppercase px-2 py-1 rounded",
                  strat.riskLevel === 'Low' ? "text-emerald-400 bg-emerald-400/10" : 
                  strat.riskLevel === 'Medium' ? "text-yellow-400 bg-yellow-400/10" : "text-rose-400 bg-rose-400/10"
                )}>
                  {strat.riskLevel} Risk
                </span>
                <ArrowRight size={16} className="text-gray-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-16 p-8 rounded-2xl bg-terminal-dark border border-terminal-lightGray text-center">
        <h4 className="text-white font-bold mb-2">Not sure which one to pick?</h4>
        <p className="text-gray-500 text-sm mb-4">Consult with a professional advisor to determine your risk profile.</p>
        <Link href="/" className="text-terminal-accent text-xs font-bold uppercase tracking-widest hover:underline">
          ← Return to Market Dashboard
        </Link>
      </div>
    </div>
  );
}

