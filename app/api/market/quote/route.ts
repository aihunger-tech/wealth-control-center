import { NextResponse } from 'next/server';
import { fetchFinancialData } from '@/lib/api-client';

export const revalidate = 30;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const type = searchParams.get('type'); // 'stock' or 'crypto'

  if (!symbol) return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });

  if (type === 'stock') {
    const apiKey = process.env.FINNHUB_API_KEY;
    const data = await fetchFinancialData(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
    
    if (!data) return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
    
    // Format Finnhub data to our MarketAsset type
    return NextResponse.json({
      symbol,
      currentPrice: data.c,
      change24h: data.d,
      changePercent: data.dp,
    });
  } 

  if (type === 'crypto') {
    // CoinGecko uses IDs (e.g., 'bitcoin') not symbols (BTC)
    const data = await fetchFinancialData(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&include_24hr_change=true`);
    
    if (!data || !data[symbol]) return NextResponse.json({ error: 'Failed to fetch crypto data' }, { status: 500 });
    
    return NextResponse.json({
      symbol,
      currentPrice: data[symbol].usd,
      change24h: data[symbol].usd_24h_change,
      changePercent: data[symbol].usd_24h_change,
    });
  }

  return NextResponse.json({ error: 'Invalid asset type' }, { status: 400 });
}
