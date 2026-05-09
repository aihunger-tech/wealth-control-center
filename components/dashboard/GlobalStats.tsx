'use client';
import useSWR from 'swr';
import { formatCurrency } from '@/lib/utils';
import { Globe, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function GlobalStats() {
  const { data, isLoading } = useSWR('/api/market/crypto?endpoint=global-quotes', fetcher);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse bg-zinc-900 rounded-2xl w-full border border-white/5" />
        ))}
      </div>
    );
  }
  
  if (!data) return null;

  const stats = data.data || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard 
        label="Global Market Cap" 
        value={formatCurrency(stats.active_cryptocurrencies?.market_cap_usd || 0)} 
        icon={<Globe size={20} />} 
        color="text-blue-400"
      />
      <StatCard 
        label="24h Volume" 
        value={formatCurrency(stats.active_cryptocurrencies?.total_volume_usd || 0)} 
        icon={<Activity size={20} />} 
        color="text-emerald-400"
      />
      <StatCard 
        label="Market Sentiment" 
        value="BULLISH" 
        icon={<Zap size={20} />} 
        color="text-purple-400"
      />
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl backdrop-blur-md flex items-center gap-4 transition-all hover:border-white/20"
    >
      <div className={`p-3 rounded-xl bg-black border border-white/10 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">{label}</p>
        <p className="text-xl font-black font-mono text-white tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}
