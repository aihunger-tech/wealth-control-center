'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, TrendingUp, Wallet, ArrowRight, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import { usePortfolioStore } from '@/hooks/usePortfolioStore';
import { useMarketData } from '@/hooks/useMarketData';
import Link from 'next/link';

export default function PortfolioPage() {
  const { assets, removeAsset, addAsset } = usePortfolioStore();
  const [newAsset, setNewAsset] = useState({ symbol: '', amount: '', price: '', type: 'stock' });
  const [isFetching, setIsFetching] = useState(false);

  const handleAdd = async () => {
    if (!newAsset.symbol || !newAsset.amount || !newAsset.price) return;
    
    addAsset({
      id: newAsset.symbol.toLowerCase(),
      symbol: newAsset.symbol.toUpperCase(),
      amount: Number(newAsset.amount),
      averagePrice: Number(newAsset.price)
    });
    setNewAsset({ symbol: '', amount: '', price: '', type: 'stock' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 max-w-6xl mx-auto w-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4 text-sm font-mono">
            ← Return to Command Center
          </Link>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            <Wallet className="text-blue-500" /> Your <span className="text-blue-500">Holdings</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Portfolio Value</p>
            <p className="text-xl font-black font-mono text-white">
              {formatCurrency(assets.reduce((acc, curr) => acc + (curr.amount * curr.averagePrice), 0))}
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Current Positions</h3>
              <Link href="/portfolio/optimizer" className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest hover:text-blue-300 transition-colors">
                  <TrendingUp size={14} /> Optimize Now
              </Link>
            </div>

            <div className="space-y-3">
              {assets.length === 0 ? (
                <p className="text-gray-500 text-center py-12 italic">No assets added yet. Start building your architecture.</p>
              ) : (
                assets.map((asset) => (
                  <PortfolioAssetRow key={asset.id} asset={asset} removeAsset={removeAsset} />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Plus size={18} className="text-blue-500" /> Add New Asset
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Symbol</label>
                  <input 
                    type="text" value={newAsset.symbol} onChange={(e) => setNewAsset({...newAsset, symbol: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white font-mono text-sm focus:border-blue-500 outline-none transition-all"
                    placeholder="BTC, AAPL"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Type</label>
                  <select 
                    value={newAsset.type} onChange={(e) => setNewAsset({...newAsset, type: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white font-mono text-sm focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="stock">Stock</option>
                    <option value="crypto">Crypto</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Amount</label>
                <input 
                  type="number" value={newAsset.amount} onChange={(e) => setNewAsset({...newAsset, amount: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white font-mono text-sm focus:border-blue-500 outline-none transition-all"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Avg Price</label>
                <input 
                  type="number" value={newAsset.price} onChange={(e) => setNewAsset({...newAsset, price: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white font-mono text-sm focus:border-blue-500 outline-none transition-all"
                  placeholder="0.00"
                />
              </div>
              <button 
                onClick={handleAdd}
                className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                Add to Holdings <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <Link 
            href="/portfolio/optimizer"
            className="block p-6 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 backdrop-blur-md text-center group hover:border-blue-500/40 transition-all"
          >
            <p className="text-white font-bold mb-2">Compare vs Strategy</p>
            <p className="text-gray-500 text-xs mb-4">Analyze your leakage and optimize your asset allocation.</p>
            <div className="flex items-center justify-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
              Launch Optimizer <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div}
          </Link>
        </div>
      </div>
    </div>
  );
}

function PortfolioAssetRow({ asset, removeAsset }: { asset: any, removeAsset: any }) {
  // We resolve the asset type based on a simple check or passed prop
  const type = asset.symbol.length < 4 ? 'crypto' : 'stock'; 
  const { asset: liveData, isLoading } = useMarketData(asset.id, type);

  const currentPrice = liveData?.currentPrice || asset.averagePrice;
  const totalValue = asset.amount * currentPrice;
  const profitLoss = totalValue - (asset.amount * asset.averagePrice);
  const plPercent = ((currentPrice / asset.averagePrice) - 1) * 100;

  return (
    <div className="group flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-blue-500/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-zinc-800 rounded-lg text-blue-400 w-10 h-10 flex items-center justify-center font-bold text-xs">
          {asset.symbol}
        </div>
        <div className="space-y-1">
          <p className="text-white font-bold">{asset.symbol}</p>
          <p className="text-gray-500 text-[10px] uppercase font-medium">{asset.amount} Units</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className={cn("font-mono font-bold", isLoading ? "text-gray-600 animate-pulse" : "text-white")}>
            {formatCurrency(currentPrice)}
          </p>
          <p className={cn("text-[10px] font-bold", profitLoss >= 0 ? "text-emerald-400" : "text-rose-400")}>
            {profitLoss >= 0 ? '+' : ''}{formatCurrency(profitLoss)} ({plPercent.toFixed(2)}%)
          </p>
        </div>
        <button 
          onClick={() => removeAsset(asset.id)}
          className="p-2 text-gray-600 hover:text-rose-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

