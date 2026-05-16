import { NextResponse } from 'next/server';
import { fetchFinancialData } from '@/lib/api-client';

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint'); // 'global-quotes' or 'quotes/latest'
  const symbol = searchParams.get('symbol'); // e.g., 'BTC'
   
  const apiKey = process.env.CMC_API_KEY;

  try {
    if (endpoint === 'global-quotes') {
      // Corrected Endpoint for Global Market Data
      const data = await fetchFinancialData(
        `https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`, 
        apiKey
      );
      
      return NextResponse.json(data);
    }

    if (endpoint === 'latest' && symbol) {
      // Fetch specific crypto quote
      const data = await fetchFinancialData(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`, 
        apiKey
      );
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'CMC API Error' }, { status: 500 });
  }
}
