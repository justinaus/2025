import { create } from 'zustand';

import { createCountSlice } from './slices/count';
import { createFishSlice } from './slices/fish';
import { AppState } from './types';

// TODO. persist, immer, DevTools

export const useBoundStore = create<AppState>((...a) => ({
  // 관련된 상태들을 하나의 스토어에서 관리
  ...createCountSlice(...a),
  ...createFishSlice(...a),
}));
