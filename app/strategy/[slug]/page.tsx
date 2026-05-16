'use client';
import { STRATEGIES } from '@/constants/strategies';
import { useParams } from 'next/navigation';
import { cn, formatCurrency } from '@/lib/utils';
import { ShieldCheck, TrendingUp, Zap, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import AnalysisChart from '@/components/dashboard/AnalysisChart';
import StrategyCalculator from '@/components/dashboard/StrategyCalculator';
import { notFound } from 'next/navigation';
import { adjustStrategyRisk } from '@/lib/risk-engine';

export default function StrategyDetail() {
  const params = useParams();
  const strategy = STRATEGIES.find(s => s.slug === params.slug);

  if (!strategy) return notFound();

  // In real app, this value comes from an API (e.g. VIX)
  const currentMarketVolatility = 24.5;
  const riskAnalysis = adjustStrategyRisk(strategy.riskLevel, currentMarketVolatility);

  // Prepare data for Chart.js Pie Chart
  const chartData = {
    labels: strategy.portfolioExample.map(item => item.asset),
    datasets: [{
      data: strategy.portfolioExample.map(item => parseInt(item.allocation)),
       backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
      borderWidth: 0,
    }],
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      <Link href="/strategy" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 text-sm font-mono">
        <ArrowLeft size={16} /> Back to Playbooks
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-2 space-y-8">
          <header>
            <div className="flex items-center gap-3 mb-4">
              <span className={cn(
                "text-[10px] font-bold uppercase px-2 py-1 rounded transition-colors duration-500",
                riskAnalysis.isWarning ? "text-rose-400 bg-rose-400/10 border border-rose-400/20" : 
                strategy.riskLevel === 'Low' ? "text-emerald-400 bg-emerald-400/10" : 
                strategy.riskLevel === 'Medium' ? "text-yellow-400 bg-yellow-400/10" : "text-rose-400 bg-rose-400/10"
              )}>
                {riskAnalysis.adjustedRisk} Strategy
              </span>
              <span className="text-gray-500 text-xs font-mono">{strategy.timeHorizon}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{strategy.title}</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              {strategy.explanation}
            </p>
          </header>

          {riskAnalysis.isWarning && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-4 text-rose-400 uppercase text-xs font-bold tracking-widest">
              <AlertCircle size={18} strokeWidth={3} />
              Market Volatility is affecting this playbook's risk profile.
            </div>
          )}

          <section className="bg-terminal-gray p-6 rounded-2xl border border-terminal-lightGray">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-terminal-accent" /> 
              Execution Steps
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm flex gap-3">
                <span className="text-terminal-accent font-bold">01.</span> 
                Identify the assets mentioned in the example portfolio.
              </li>
              <li className="text-gray-400 text-sm flex gap-3">
                <span className="text-terminal-accent font-bold">02.</span> 
                Set up a recurring monthly contribution.
              </li>
              <li className="text-gray-400 text-sm flex gap-3">
                <span className="text-terminal-accent font-bold">03.</span> 
                Rebalance your portfolio every quarter.
              </li>
            </ul>
          </section>

          <StrategyCalculator />
        </div>

        {/* Right Column: Visualization */}
        <div className="space-y-8">
          <div className="bg-terminal-dark p-6 rounded-2xl border border-terminal-lightGray">
            <h3 className="text-white font-bold mb-6 text-center">Model Allocation</h3>
            <AnalysisChart type="pie" data={chartData} height="250px" />
            
            <div className="mt-6 space-y-3">
              {strategy.portfolioExample.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded bg-terminal-gray/50 text-xs">
                  <span className="text-gray-400">{item.asset}</span>
                  <span className="text-white font-mono font-bold">{item.allocation}</span>
                </div>
              ))}
            </div>
          </div>

          <Link 
            href="/" 
            className="block text-center w-full py-4 bg-terminal-accent text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
          >
            Apply This Strategy Now
          </Link>
        </div>
      </div>
    </div>
  );
}


