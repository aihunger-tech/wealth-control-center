import useSWR from 'swr';
import { MarketAsset } from '@/types/finance';
import { fetchFinancialData } from '@/lib/api-client'; // <--- ADDED THIS IMPORT

export function useMarketData(symbol: string, type: 'stock' | 'crypto') {
  const { data, error, isLoading, mutate } = useSWR<MarketAsset>(
    `/api/market/quote?symbol=${symbol}&type=${type}`, 
    fetchFinancialData, 
    { 
      refreshInterval: 60000, 
      revalidateOnFocus: true 
    }
  );

  return {
    asset: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
