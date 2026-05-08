import { InvestmentStrategy } from '@/types/finance';

export const STRATEGIES: InvestmentStrategy[] = [
  {
    id: '1',
    slug: 'dollar-cost-averaging',
    title: 'Dollar Cost Averaging (DCA)',
    description: 'Investing a fixed amount regularly regardless of price.',
    riskLevel: 'Low',
    timeHorizon: 'Long Term (5+ Years)',
    explanation: 'DCA reduces the impact of volatility. By investing $100 every month, you buy more shares when prices are low and fewer when prices are high, lowering your average cost per share over time.',
    portfolioExample: [
      { asset: 'S&P 500 Index Fund', allocation: '70%' },
      { asset: 'Bitcoin (BTC)', allocation: '20%' },
      { asset: 'Cash/Gold', allocation: '10%' },
    ],
  },
  {
    id: '2',
    slug: 'value-investing',
    title: 'Value Investing',
    description: 'Finding undervalued assets trading for less than their intrinsic value.',
    riskLevel: 'Medium',
    timeHorizon: 'Medium to Long Term',
    explanation: 'Inspired by Benjamin Graham and Warren Buffett, this strategy focuses on fundamental analysis. You look for companies with strong balance sheets but temporarily depressed stock prices.',
    portfolioExample: [
      { asset: 'Under-valued Blue Chip Stocks', allocation: '60%' },
      { asset: 'Dividend Growth Stocks', allocation: '30%' },
      { asset: 'Cash Reserves', allocation: '10%' },
    ],
  },
  {
    id: '3',
    slug: 'momentum-trading',
    title: 'Momentum Trading',
    description: 'Riding the trend of assets that are already moving upward.',
    riskLevel: 'High',
    timeHorizon: 'Short Term (Days/Weeks)',
    explanation: 'Momentum traders use technical indicators (like RSI and MACD) to identify assets in a strong uptrend and ride that wave until the trend reverses.',
    portfolioExample: [
      { asset: 'Trending Tech Stocks', allocation: '50%' },
      { asset: 'High-Volatility Altcoins', allocation: '40%' },
      { asset: 'Hedged Options', allocation: '10%' },
    ],
  },
];
