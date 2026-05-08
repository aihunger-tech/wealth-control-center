'use client';
import { useMarketData } from '@/hooks/useMarketData';
import { formatCurrency, formatPercent, getPriceColor } from '@/lib/utils';

const TICKER_ASSETS = [
  { symbol: 'AAPL', type: 'stock' as const },
  { symbol: 'TSLA', type: 'stock' as const },
  { symbol: 'bitcoin', type: 'crypto' as const },
  { symbol: 'ethereum', type: 'crypto' as const },
  { symbol: 'NVDA', type: 'stock' as const },
  { symbol: 'solana', type: 'crypto' as const },
];

export default function MarketTicker() {
  return (
    <div className="bg-terminal-dark border-b border-terminal-lightGray py-2 overflow-hidden whitespace-nowrap flex items-center">
      <div className="flex animate-scroll gap-8 px-4">
        {TICKER_ASSETS.map((asset) => (
          <TickerItem key={asset.symbol} asset={asset} />
        ))}
        {/* Duplicate for seamless infinite scroll */}
        {TICKER_ASSETS.map((asset) => (
          <TickerItem key={`dup-${asset.symbol}`} asset={asset} />
        ))}
      </div>
    </div>
  );
}

function TickerItem({ asset }: { asset: typeof TICKER_ASSETS[0] }) {
  const { asset: data, isLoading } = useMarketData(asset.symbol, asset.type);

  if (isLoading) return <span className="text-gray-600 font-mono text-xs uppercase">{asset.symbol}...</span>;
  if (!data) return null;

  return (
  <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
    <span className="text-gray-400 font-bold">{asset.symbol}</span>
    <span className="text-white">{formatCurrency(data.currentPrice)}</span>
    <span className={getPriceColor(data.changePercent)}>
      {formatPercent(data.changePercent)}
    </span>
  </div>
);
}
