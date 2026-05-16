'use client';

import React from 'react';
import { MarketAsset } from '@/types/finance';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, Trash2, LayoutGrid, List, Zap } from 'lucide-react';
import Link from 'next/link';
import { useWatchlistStore } from '@/hooks/useWatchlistStore';
import AssetCard from '@/components/dashboard/AssetCard';
import { cn, formatCurrency } from '@/lib/utils';

export default function WatchlistPage() {
  const { starredAssets, removeStar } = useWatchlistStore();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const MOCK_MARKET_DATA: MarketAsset[] = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', currentPrice: 65000, change24h: 1200, changePercent: 1.8, type: 'crypto' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', currentPrice: 3500, change24h: -50, changePercent: -1.2, type: 'crypto' },
    { id: 'AAPL', symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 175, change24h: 2, changePercent: 0.5, type: 'stock' },
    { id: 'NVDA', symbol: 'NVDA', name: 'Nvidia', currentPrice: 900, change24h: 45, changePercent: 4.2, type: 'stock' },
    { id: 'TSLA', symbol: 'TSLA', name: 'Tesla', currentPrice: 180, change24h: -10, changePercent: -2.1, type: 'stock' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', currentPrice: 145, change24h: 5, changePercent: 2.5, type: 'crypto' },
    { id: 'MSFT', symbol: 'MSFT', name: 'Microsoft', currentPrice: 420, change24h: 3, changePercent: 0.8, type: 'stock' },
    { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin', currentPrice: 600, change24h: -2, changePercent: -0.3, type: 'crypto' },
  ];

  const myAssets = MOCK_MARKET_DATA.filter(asset => starredAssets.includes(asset.id));

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 max-w-7xl mx-auto w-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4 text-sm font-mono">
            <ArrowLeft size={16} /> Return to Command Center
          </Link>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            My <span className="text-blue-500">Watchlist</span>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
              {myAssets.length} Assets
            </div>
          </h1>
        </div>

        <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
          <button 
            onClick={() => setViewMode('grid')}
            className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-blue-500 text-white shadow-lg" : "text-gray-500 hover:text-white")}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-blue-500 text-white shadow-lg" : "text-gray-500 hover:text-white")}
          >
            <List size={18} />
          </button>
        </div>
      </header>

      {myAssets.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-6 rounded-full bg-white/5 border border-white/10 text-gray-600">
            <Star size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Your Watchlist is Empty</h3>
            <p className="text-gray-500 max-w-xs mx-auto">
              Star your favorite assets from the Strategic Assets grid to track them here in real-time.
            </p>
          </div>
          <Link 
            href="/" 
            className="px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:scale-105 transition-transform"
          >
            Explore Assets
          </Link>
        </div>
      ) : (
        <div className={cn(
          "grid gap-4 transition-all duration-500",
          viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
        )}>
          {myAssets.map((asset) => (
            <WatchlistAssetRow key={asset.id} asset={asset} removeStar={removeStar} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}

function WatchlistAssetRow({ asset, removeStar, viewMode }: { asset: any, removeStar: any, viewMode: 'grid' | 'list' }) {
  const { asset: liveData, isLoading } = useMarketData(asset.id, asset.type);
  const finalAsset = liveData 
    ? { ...asset, currentPrice: liveData.currentPrice, change24h: liveData.change24h, changePercent: liveData.changePercent }
    : asset;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative group",
        viewMode === 'list' && "flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
      )}
    >
      {viewMode === 'grid' ? (
        <AssetCard asset={finalAsset} isLoading={isLoading} />
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-zinc-800 rounded-lg text-blue-400">
              <Zap size={16} fill="currentColor" />
            </div>
            <div>
              <h4 className="font-bold text-white">{finalAsset.name} <span className="text-gray-500 text-xs ml-1">{finalAsset.symbol}</span></h4>
              <p className="text-gray-500 text-[10px] uppercase font-bold">{finalAsset.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className={cn("text-white font-mono font-bold", isLoading && "text-gray-600 animate-pulse")}>
                {formatCurrency(finalAsset.currentPrice)}
              </p>
              <p className={cn("text-xs font-bold", finalAsset.changePercent >= 0 ? "text-emerald-400" : "text-rose-400")}>
                {finalAsset.changePercent}%
              </p>
            </div>
            <button 
              onClick={() => removeStar(asset.id)}
              className="p-2 text-gray-600 hover:text-rose-400 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

