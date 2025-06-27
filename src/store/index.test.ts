import { beforeEach, describe, expect, it } from "vitest";

import { useBoundStore } from "./index";

describe("useBoundStore", () => {
  beforeEach(() => {
    // 각 테스트 전에 스토어 상태 초기화
    useBoundStore.setState({
      count: 0,
      fishes: 100,
    });
  });

  describe("count slice", () => {
    it("should have initial count of 0", () => {
      const count = useBoundStore.getState().count;
      expect(count).toBe(0);
    });

    it("should increase count", () => {
      const { increaseCount } = useBoundStore.getState();
      increaseCount();

      const count = useBoundStore.getState().count;
      expect(count).toBe(1);
    });

    it("should increase count multiple times", () => {
      const { increaseCount } = useBoundStore.getState();
      increaseCount();
      increaseCount();
      increaseCount();

      const count = useBoundStore.getState().count;
      expect(count).toBe(3);
    });

    it("should reset count", () => {
      const { increaseCount, resetCount } = useBoundStore.getState();
      increaseCount();
      increaseCount();
      resetCount();

      const count = useBoundStore.getState().count;
      expect(count).toBe(0);
    });

    it("should get count plus fishes", () => {
      const { increaseCount, getCountPlusFishes } = useBoundStore.getState();
      increaseCount();
      increaseCount();

      const result = getCountPlusFishes();
      expect(result).toBe(102); // count: 2 + fishes: 100
    });
  });

  describe("fish slice", () => {
    it("should have initial fishes of 100", () => {
      const fishes = useBoundStore.getState().fishes;
      expect(fishes).toBe(100);
    });

    it("should add fish", () => {
      const { addFish } = useBoundStore.getState();
      addFish();

      const fishes = useBoundStore.getState().fishes;
      expect(fishes).toBe(101);
    });

    it("should add multiple fishes", () => {
      const { addFish } = useBoundStore.getState();
      addFish();
      addFish();
      addFish();

      const fishes = useBoundStore.getState().fishes;
      expect(fishes).toBe(103);
    });
  });

  describe("combined functionality", () => {
    it("should work with both slices together", () => {
      const { increaseCount, addFish, getCountPlusFishes } =
        useBoundStore.getState();

      increaseCount();
      increaseCount();
      addFish();
      addFish();

      const count = useBoundStore.getState().count;
      const fishes = useBoundStore.getState().fishes;
      const combined = getCountPlusFishes();

      expect(count).toBe(2);
      expect(fishes).toBe(102);
      expect(combined).toBe(104);
    });

    it("should maintain state between operations", () => {
      const { increaseCount, addFish, resetCount } = useBoundStore.getState();

      increaseCount();
      addFish();
      increaseCount();

      let count = useBoundStore.getState().count;
      let fishes = useBoundStore.getState().fishes;
      expect(count).toBe(2);
      expect(fishes).toBe(101);

      resetCount();

      count = useBoundStore.getState().count;
      fishes = useBoundStore.getState().fishes;
      expect(count).toBe(0);
      expect(fishes).toBe(101); // fishes는 그대로 유지
    });
  });
});
