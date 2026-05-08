export type AssetType = 'stock' | 'crypto' | 'forex';

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number;
  changePercent: number;
  type: AssetType;
  marketCap?: number;
  volume24h?: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  category: 'Stocks' | 'Crypto' | 'Economy';
  imageUrl: string;
}

export interface InvestmentStrategy {
  id: string;
  title: string;
  slug: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  timeHorizon: string;
  explanation: string;
  portfolioExample: {
    asset: string;
    allocation: string;
  }[];
}

export interface PricePoint {
  time: string;
  value: number;
}
