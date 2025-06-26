import { StateCreator } from 'zustand';

import { AppState } from '@/store/types';

import { FishSlice } from './types';

export const createFishSlice: StateCreator<AppState, [], [], FishSlice> = (
  set,
) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});
