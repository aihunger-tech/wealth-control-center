'use client';
import { STRATEGIES } from '@/constants/strategies';
import { useParams } from 'next/navigation';
import { cn, formatCurrency } from '@/lib/utils';
import { ShieldCheck, TrendingUp, Zap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AnalysisChart from '@/components/dashboard/AnalysisChart';
import { notFound } from 'next/navigation';

export default function StrategyDetail() {
  const params = useParams();
  const strategy = STRATEGIES.find(s => s.slug === params.slug);

  if (!strategy) return notFound();

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
                "text-[10px] font-bold uppercase px-2 py-1 rounded",
                strategy.riskLevel === 'Low' ? "text-emerald-400 bg-emerald-400/10" : 
                strategy.riskLevel === 'Medium' ? "text-yellow-400 bg-yellow-400/10" : "text-rose-400 bg-rose-400/10"
              )}>
                {strategy.riskLevel} Risk Strategy
              </span>
              <span className="text-gray-500 text-xs font-mono">{strategy.timeHorizon}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{strategy.title}</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              {strategy.explanation}
            </p>
          </header>

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
