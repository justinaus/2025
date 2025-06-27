/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";

// Mock fetch response helper
export const createMockFetchResponse = (
  data: unknown,
  ok = true,
  status = 200,
) => ({
  ok,
  status,
  json: async () => data,
});

// Mock fetch error helper
export const createMockFetchError = (error: string) => {
  throw new Error(error);
};

// Mock Zustand store helper
export const mockZustandStore = (mockState: any) => {
  return vi.fn().mockImplementation((selector: any) => {
    if (typeof selector === "function") {
      return selector(mockState);
    }
    return mockState[selector];
  });
};

// Test data helpers
export const mockTodo = (overrides = {}) => ({
  userId: 1,
  id: 1,
  title: "Test Todo",
  completed: false,
  ...overrides,
});

export const mockPost = (overrides = {}) => ({
  userId: 1,
  id: 1,
  title: "Test Post",
  body: "Test Body",
  ...overrides,
});

export const mockComment = (overrides = {}) => ({
  postId: 1,
  id: 1,
  name: "Test User",
  email: "test@example.com",
  body: "Test Comment",
  ...overrides,
});

// Async test helper
export const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
