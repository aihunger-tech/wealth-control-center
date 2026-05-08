'use client';
import useSWR from 'swr';
import { formatCurrency } from '@/lib/utils';
import { Globe, Activity, Zap } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function GlobalStats() {
  // Fetching from our CMC proxy route
  const { data, isLoading } = useSWR('/api/market/crypto?endpoint=global-quotes', fetcher);

  if (isLoading) return <div className="h-24 animate-pulse bg-terminal-gray rounded-lg w-full" />;
  if (!data) return null;

  // CMC Global data structure is deep, we extract the key metrics
  const stats = data.data || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <StatCard 
        label="Global Market Cap" 
        value={formatCurrency(stats.active_cryptocurrencies?.market_cap_usd || 0)} 
        icon={<Globe size={18} />} 
      />
      <StatCard 
        label="24h Volume" 
        value={formatCurrency(stats.active_cryptocurrencies?.total_volume_usd || 0)} 
        icon={<Activity size={18} />} 
      />
      <StatCard 
        label="Market Sentiment" 
        value="BULLISH" 
        icon={<Zap size={18} />} 
        highlight="text-terminal-up"
      />
    </div>
  );
}

function StatCard({ label, value, icon, highlight = "text-white" }: any) {
  return (
    <div className="bg-terminal-gray border border-terminal-lightGray p-4 rounded-lg flex items-center gap-4">
      <div className="p-2 bg-terminal-black rounded-md text-terminal-accent">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-[10px] uppercase font-mono tracking-widest">{label}</p>
        <p className={`text-lg font-mono font-bold ${highlight}`}>{value}</p>
      </div>
    </div>
  );
}
