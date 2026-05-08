'use client';
import AssetCard from './AssetCard';
import { MarketAsset } from '@/types/finance';

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

export default function MarketGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {FEATURED_ASSETS.map((asset) => (
        <AssetCard key={asset.symbol} asset={asset} />
      ))}
    </div>
  );
}
