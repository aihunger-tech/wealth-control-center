export type Sentiment = 'BULLISH' | 'BEARISH' | 'NEUTRAL';

export interface MarketSentiment {
  overall: Sentiment;
  summary: string;
  confidence: number; // 0 to 100%
}

export async function analyzeMarketSentiment(articles: any[]): Promise<MarketSentiment> {
  // In a production environment, this would call an LLM (OpenAI/Claude) API
  // analyzing the actual article text and titles.
  
  // Simulating an AI analysis over the current headlines
  const positiveWords = ['record', 'growth', 'adoption', 'bull', 'high', 'up', 'gain'];
  const negativeWords = ['cut', 'drop', 'low', 'bear', 'risk', 'down', 'fall', 'caution'];
  
  let score = 0;
  articles.forEach(art => {
    const title = art.title.toLowerCase();
    positiveWords.forEach(word => { if (title.includes(word)) score++; });
    negativeWords.forEach(word => { if (title.includes(word)) score--; });
  });

  let overall: Sentiment = 'NEUTRAL';
  let summary = "Market signals are mixed with no clear dominant trend.";

  if (score > 2) {
    overall = 'BULLISH';
    summary = "Strong positive momentum detected in primary growth assets, driven by institutional adoption.";
  } else if (score < -2) {
    overall = 'BEARISH';
    summary = "Caution advised. Macro headwinds and regulatory pressures are creating significant downward pressure.";
  }

  return {
    overall,
    summary,
    confidence: 75 + Math.floor(Math.random() * 20), // Simulate AI confidence 75-95%
  };
}
