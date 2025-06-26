export interface CountSlice {
  count: number;
  increaseCount: () => void;
  resetCount: () => void;
  getCountPlusFishes: () => number;
}
