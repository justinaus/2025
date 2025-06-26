import { CountSlice } from './slices/count/types';
import { FishSlice } from './slices/fish/types';

// 전체 스토어 타입
export type AppState = CountSlice & FishSlice;
