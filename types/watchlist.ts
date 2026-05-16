import { MarketAsset } from './finance';

export interface WatchlistState {
  starredAssets: string[]; // Array of asset IDs
  customGroups: {
    id: string;
    name: string;
    assets: string[];
  }[];
}

export const INITIAL_WATCHLIST_STATE: WatchlistState = {
  starredAssets: [],
  customGroups: [],
};
