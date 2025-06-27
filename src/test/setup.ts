import "@testing-library/jest-dom";

import { cleanup } from "@testing-library/react";
import React from "react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

// React를 전역으로 설정
global.React = React;

// 각 테스트 후 cleanup
afterEach(() => {
  cleanup();
});

// 전역 fetch 모킹
global.fetch = vi.fn();

// 전역 console.error 모킹 (React 경고 숨김)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: ReactDOM.render is no longer supported")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
