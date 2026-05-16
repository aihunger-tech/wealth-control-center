'use client';
import useSWR from 'swr';
import { formatCurrency } from '@/lib/utils';
import { Globe, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import StatCard from '@/components/ui/StatCard';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function GlobalStats() {
  const { data, error, isLoading, isValidating } = useSWR('/api/market/crypto?endpoint=global-quotes', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-6 bg-zinc-900 rounded-2xl border border-white/5">
          <p className="text-red-400 mb-2">Failed to load market data</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-xs bg-blue-500 hover:bg-blue-600 text-white font-mono px-3 py-1 rounded"
          >
            Retry
          </button>
        </div>
        {[1, 2].map((i) => (
          <div key={i} className="h-24 bg-zinc-900 rounded-2xl border border-white/5" />
        ))}
      </div>
    );
  }

  if (isLoading && !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse bg-zinc-900 rounded-2xl w-full border border-white/5" />
        ))}
      </div>
    );
  }

  const statsData = data?.data || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard 
        label="Global Market Cap" 
        value={formatCurrency(statsData.active_cryptocurrencies?.market_cap_usd || 0)} 
        icon={<Globe size={20} />} 
        color="text-blue-400"
        borderColor="group-hover:border-blue-500/50"
      />
      <StatCard 
        label="24h Volume" 
        value={formatCurrency(statsData.active_cryptocurrencies?.total_volume_usd || 0)} 
        icon={<Activity size={20} />} 
        color="text-emerald-400"
        borderColor="group-hover:border-emerald-500/50"
      />
      <StatCard 
        label="Market Sentiment" 
        value="BULLISH" 
        icon={<Zap size={20} />} 
        color="text-purple-400"
        borderColor="group-hover:border-purple-500/50"
      />
    </div>
  );
}
