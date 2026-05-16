'use client';
import { create } from 'zustand';

interface PriceState {
  prices: Record<string, number>;
  updatePrice: (symbol: string, price: number) => void;
}

export const usePriceStore = create<PriceState>((set: any) => ({
  prices: {},
  updatePrice: (symbol: string, price: number) => 
    set((state: PriceState) => ({
      prices: { ...state.prices, [symbol]: price }
    })),
}));
