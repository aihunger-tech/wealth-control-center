export interface PortfolioAsset {
  id: string;
  symbol: string;
  amount: number; // quantity of assets
  averagePrice: number;
}

export interface PortfolioState {
  assets: PortfolioAsset[];
}

export const INITIAL_PORTFOLIO: PortfolioState = {
  assets: [
    { id: 'bitcoin', symbol: 'BTC', amount: 0.5, averagePrice: 45000 },
    { id: 'ethereum', symbol: 'ETH', amount: 4.0, averagePrice: 2200 },
    { id: 'AAPL', symbol: 'AAPL', amount: 10, averagePrice: 150 },
  ],
};
