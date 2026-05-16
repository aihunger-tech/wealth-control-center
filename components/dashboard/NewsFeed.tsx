'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Newspaper, TrendingUp, BrainCircuit, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { analyzeMarketSentiment, Sentiment } from '@/lib/ai-sentiment';

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
  const [sentiment, setSentiment] = useState<{ overall: Sentiment; summary: string; confidence: number } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const getSentiment = async () => {
      setIsAnalyzing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = await analyzeMarketSentiment(MOCK_NEWS);
      setSentiment(result);
      setIsAnalyzing(false);
    };
    getSentiment();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-1 w-8 bg-purple-500 rounded-full" />
          <h3 className="text-xs font-mono uppercase text-gray-500 tracking-widest">Intelligence Feed</h3>
        </div>
        {sentiment && (
          <div className="flex items-center gap-2 text-purple-400 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={12} /> AI Analyzed
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-center gap-4"
          >
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 animate-pulse">
              <BrainCircuit size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-white">AI Intelligence Engine</p>
              <p className="text-[10px] text-gray-500 font-mono">Analyzing headlines for sentiment patterns...</p>
            </div>
          </motion.div>
        ) : sentiment && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-5 rounded-3xl border transition-all duration-500 relative overflow-hidden",
              sentiment.overall === 'BULLISH' ? "bg-emerald-500/5 border-emerald-500/20" : 
              sentiment.overall === 'BEARISH' ? "bg-rose-500/5 border-rose-500/20" : "bg-blue-500/5 border-blue-500/20"
            )}
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BrainCircuit size={16} className={cn(
                    sentiment.overall === 'BULLISH' ? "text-emerald-400" : 
                    sentiment.overall === 'BEARISH' ? "text-rose-400" : "text-blue-400"
                  )} />
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    sentiment.overall === 'BULLISH' ? "text-emerald-400" : 
                    sentiment.overall === 'BEARISH' ? "text-rose-400" : "text-blue-400"
                  )}>
                    Market Sentiment: {sentiment.overall}
                  </span>
                </div>
                <p className="text-white text-sm font-medium leading-relaxed max-w-2xl">
                  {sentiment.summary}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-mono uppercase">Confidence</p>
                <p className="text-lg font-black text-white font-mono">{sentiment.confidence}%</p>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
              <BrainCircuit size={80} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            className={cn(
              "group relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-full",
              "hover:border-purple-500/50 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
            )}
          >
            <div className="relative z-10">
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
            
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase">
                Impact: <span className="text-zinc-300 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{news.impact}</span>
              </div>
              <ExternalLink size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
