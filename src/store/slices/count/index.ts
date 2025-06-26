import { StateCreator } from 'zustand';

import { AppState } from '@/store/types';

import { CountSlice } from './types';

export const createCountSlice: StateCreator<AppState, [], [], CountSlice> = (
  set,
) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
});
