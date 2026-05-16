'use client';
import { create } from 'zustand';
import { PortfolioState, INITIAL_PORTFOLIO, PortfolioAsset } from '@/types/portfolio';

interface PortfolioStore {
  assets: PortfolioAsset[];
  updateAsset: (id: string, amount: number, price: number) => void;
  addAsset: (asset: PortfolioAsset) => void;
  removeAsset: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  assets: INITIAL_PORTFOLIO.assets,
  updateAsset: (id, amount, price) => set((state) => ({
    assets: state.assets.map(a => a.id === id ? { ...a, amount, averagePrice: price } : a)
  })),
  addAsset: (asset) => set((state) => ({
    assets: [...state.assets, asset]
  })),
  removeAsset: (id) => set((state) => ({
    assets: state.assets.filter(a => a.id !== id)
  })),
}));
