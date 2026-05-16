'use client';
import React from 'react';
import AssetCard from './AssetCard';
import { MarketAsset } from '@/types/finance';
import { useProfileStore } from '@/hooks/useProfileStore';
import { cn } from '@/lib/utils';
import { useMarketData } from '@/hooks/useMarketData';

function LiveAssetWrapper({ asset }: { asset: MarketAsset }) {
  const { asset: liveData, isLoading } = useMarketData(asset.id, asset.type);
  const { profile } = useProfileStore();

  const finalAsset = liveData 
    ? { ...asset, currentPrice: liveData.currentPrice, change24h: liveData.change24h, changePercent: liveData.changePercent }
    : asset;

  const isHighGrowth = finalAsset.type === 'crypto' || finalAsset.symbol === 'NVDA';
  const isGoalAligned = 
    (profile.goal === 'Hyper Growth' && isHighGrowth) || 
    (profile.goal === 'Preservation' && finalAsset.type === 'stock' && finalAsset.symbol === 'MSFT') ||
    (profile.goal === 'Balanced Growth');

  return (
    <div className={cn(
      "relative transition-all duration-500 rounded-2xl",
      isGoalAligned ? "ring-2 ring-blue-500/30 scale-[1.02]" : "scale-100"
    )}>
      {isGoalAligned && (
        <div className="absolute -top-2 -right-2 z-20 bg-blue-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-lg">
          Goal Match
        </div>
      )}
      <AssetCard asset={finalAsset} isLoading={isLoading} />
    </div>
  );
}

const FEATURED_ASSETS: MarketAsset[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', currentPrice: 0, change24h: 0, changePercent: 0, type: 'crypto' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', currentPrice: 0, change24h: 0, changePercent: 0, type: 'crypto' },
  { id: 'AAPL', symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 0, change24h: 0, changePercent: 0, type: 'stock' },
  { id: 'NVDA', symbol: 'NVDA', name: 'Nvidia', currentPrice: 0, change24h: 0, changePercent: 0, type: 'stock' },
  { id: 'TSLA', symbol: 'TSLA', name: 'Tesla', currentPrice: 0, change24h: 0, changePercent: 0, type: 'stock' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', currentPrice: 0, change24h: 0, changePercent: 0, type: 'crypto' },
  { id: 'MSFT', symbol: 'MSFT', name: 'Microsoft', currentPrice: 0, change24h: 0, changePercent: 0, type: 'stock' },
  { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin', currentPrice: 0, change24h: 0, changePercent: 0, type: 'crypto' },
];

export default function MarketGrid({ density = 'normal' }: { density?: 'normal' | 'compact' }) {
  return (
    <div className={cn(
      "grid gap-4 transition-all",
      density === 'compact' ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    )}>
      {FEATURED_ASSETS.map((asset) => (
        <LiveAssetWrapper key={asset.symbol} asset={asset} />
      ))}
    </div>
  );
}

