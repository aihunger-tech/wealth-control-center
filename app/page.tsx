// import MarketTicker from '@/components/dashboard/MarketTicker';
import GlobalStats from '@/components/dashboard/GlobalStats';
import MarketGrid from '@/components/dashboard/MarketGrid';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col h-full">
      {/* 1. The Pulse */}
      {/* <MarketTicker /> */}

      <div className="p-4 sm:p-8 space-y-8">
        {/* Header Section */}
        <header className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Market Intelligence</h2>
            <p className="text-gray-500 font-mono text-xs">Real-time data stream active</p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-gray-400 text-xs font-mono">{new Date().toDateString()}</p>
            <p className="text-terminal-accent text-xs font-bold uppercase">Network: Optimized</p>
          </div>
        </header>

        {/* 2. The Big Picture */}
        <GlobalStats />

        {/* 3. The Focus Grid */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-mono uppercase text-gray-400 tracking-widest">Featured Assets</h3>
            <Link href="/watchlist" className="text-xs text-terminal-accent hover:underline">View All →</Link>
          </div>
          <MarketGrid />
        </section>

        {/* 4. Funnel Transition (CTA) */}
        <section className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-terminal-accent to-blue-800 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Ready to Grow Your Wealth?</h3>
            <p className="text-blue-100 text-sm mb-6 max-w-md">
              Stop guessing and start investing. Our Strategy Hub provides professional-grade frameworks 
              for DCA, Value Investing, and Momentum Trading.
            </p>
            <Link 
              href="/strategy" 
              className="inline-flex items-center gap-2 bg-white text-terminal-black px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-all"
            >
              Enter Strategy Hub <ArrowRight size={16} />
            </Link>
          </div>
          {/* Background Decorative Icon */}
          <TrendingUp size={120} className="absolute -right-4 -bottom-4 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
        </section>
      </div>
    </div>
  );
}
