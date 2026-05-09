'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Newspaper, TrendingUp } from 'lucide-react';

const MOCK_NEWS = [
  {
    id: 1,
    title: "Institutional Adoption: Bitcoin ETF Inflows Hit Record High",
    category: "Crypto",
    time: "2h ago",
    url: "https://cointelegraph.com",
    impact: "High",
    color: "text-emerald-400"
  },
  {
    id: 2,
    title: "Federal Reserve Signals Potential Rate Cut in Q3",
    category: "Macro",
    time: "5h ago",
    url: "https://bloomberg.com",
    impact: "Medium",
    color: "text-blue-400"
  },
  {
    id: 3,
    title: "Nvidia's Blackwell Chips: The New Era of AI Infrastructure",
    category: "Stocks",
    time: "1d ago",
    url: "https://reuters.com",
    impact: "High",
    color: "text-purple-400"
  },
];

export default function NewsFeed() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-purple-500 rounded-full" />
        <h3 className="text-xs font-mono uppercase text-gray-500 tracking-widest">Intelligence Feed</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_NEWS.map((news, idx) => (
          <motion.a
            key={news.id}
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-purple-500/50 transition-all hover:bg-white/[0.05] flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className={cn("text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md bg-white/5 border border-white/10", news.color)}>
                  {news.category}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">{news.time}</span>
              </div>
              <h4 className="text-white font-bold leading-tight group-hover:text-purple-400 transition-colors">
                {news.title}
              </h4>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase">
                Impact: <span className="text-zinc-300">{news.impact}</span>
              </div>
              <ExternalLink size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

// Helper for the colors since we are in a new file
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
