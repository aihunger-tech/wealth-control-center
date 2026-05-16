'use client';
import { useEffect } from 'react';
import { usePriceStore } from './usePriceStore';

export function useWebSocketPriceFeed() {
  const updatePrice = usePriceStore((state: any) => state.updatePrice);

  useEffect(() => {
    // Using a public simulation of a WebSocket feed for the demo
    // In production, this would be 'wss://stream.binance.com:9443/ws' or Finnhub
    const simulateWebSocket = () => {
      const symbols = ['bitcoin', 'ethereum', 'solana', 'binancecoin', 'AAPL', 'NVDA', 'TSLA', 'MSFT'];
      
      const interval = setInterval(() => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const currentPrice = Math.random() * 1000; // Simulating price drift
        updatePrice(randomSymbol, currentPrice);
      }, 2000);

      return interval;
    };

    const intervalId = simulateWebSocket();
    return () => clearInterval(intervalId);
  }, [updatePrice]);
}
