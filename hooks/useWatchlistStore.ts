'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WatchlistState, INITIAL_WATCHLIST_STATE } from '@/types/watchlist';

interface WatchlistStore {
  starredAssets: string[];
  toggleStar: (id: string) => void;
  removeStar: (id: string) => void;
}

export const useWatchlistStore = create<WatchlistStore>((set: any) => ({
  starredAssets: INITIAL_WATCHLIST_STATE.starredAssets,
  toggleStar: (id: string) => set((state: WatchlistStore) => ({
    starredAssets: state.starredAssets.includes(id) 
      ? state.starredAssets.filter((a: string) => a !== id) 
      : [...state.starredAssets, id]
  })),
  removeStar: (id: string) => set((state: WatchlistStore) => ({
    starredAssets: state.starredAssets.filter((a: string) => a !== id)
  })),
}));
