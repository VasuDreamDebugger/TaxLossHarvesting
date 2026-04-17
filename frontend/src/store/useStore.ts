import { create } from 'zustand';
import type { Asset, CapitalGains } from '../types';

interface StoreState {
  holdings: Asset[];
  baseCapitalGains: CapitalGains;
  selectedAssets: string[];
  setHoldings: (holdings: Asset[]) => void;
  setBaseCapitalGains: (gains: CapitalGains) => void;
  toggleAssetSelection: (id: string) => void;
  clearSelection: () => void;
}

export const useStore = create<StoreState>((set) => ({
  holdings: [],
  baseCapitalGains: { 
    stcg: { profits: 0, losses: 0 }, 
    ltcg: { profits: 0, losses: 0 } 
  },
  selectedAssets: [],
  setHoldings: (holdings) => set({ holdings }),
  setBaseCapitalGains: (baseCapitalGains) => set({ baseCapitalGains }),
  toggleAssetSelection: (id) =>
    set((state) => ({
      selectedAssets: state.selectedAssets.includes(id)
        ? state.selectedAssets.filter((assetId) => assetId !== id)
        : [...state.selectedAssets, id],
    })),
  clearSelection: () => set({ selectedAssets: [] }),
}));
