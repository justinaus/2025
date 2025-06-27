/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useBoundStore } from "@/store";

import { Count } from "./index";

// Zustand 스토어 모킹
vi.mock("@/store", () => ({
  useBoundStore: vi.fn(),
}));

describe("Count Component", () => {
  const mockIncreaseCount = vi.fn();
  const mockGetCountPlusFishes = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCountPlusFishes.mockReturnValue(100);
  });

  it("should render count and countPlusFishes", () => {
    (useBoundStore as any).mockImplementation((selector: any) => {
      if (selector.toString().includes("count")) return 5;
      if (selector.toString().includes("increaseCount"))
        return mockIncreaseCount;
      if (selector.toString().includes("getCountPlusFishes"))
        return mockGetCountPlusFishes;
      return undefined;
    });

    render(<Count />);

    expect(screen.getByText("count: 5")).toBeInTheDocument();
    expect(screen.getByText("countPlusFishes: 100")).toBeInTheDocument();
    expect(mockGetCountPlusFishes).toHaveBeenCalled();
  });

  it("should call increaseCount when count is odd", () => {
    (useBoundStore as any).mockImplementation((selector: any) => {
      if (selector.toString().includes("count")) return 3; // odd number
      if (selector.toString().includes("increaseCount"))
        return mockIncreaseCount;
      if (selector.toString().includes("getCountPlusFishes"))
        return mockGetCountPlusFishes;
      return undefined;
    });

    render(<Count />);

    const button = screen.getByRole("button", { name: "Click" });
    fireEvent.click(button);

    expect(mockIncreaseCount).toHaveBeenCalled();
  });

  it("should show alert dialog when count is even", () => {
    (useBoundStore as any).mockImplementation((selector: any) => {
      if (selector.toString().includes("count")) return 2; // even number
      if (selector.toString().includes("increaseCount"))
        return mockIncreaseCount;
      if (selector.toString().includes("getCountPlusFishes"))
        return mockGetCountPlusFishes;
      return undefined;
    });

    render(<Count />);

    const button = screen.getByRole("button", { name: "Click" });
    fireEvent.click(button);

    // Alert dialog가 렌더링되었는지 확인
    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
    expect(mockIncreaseCount).not.toHaveBeenCalled();
  });

  it("should render button with correct className", () => {
    (useBoundStore as any).mockImplementation((selector: any) => {
      if (selector.toString().includes("count")) return 0;
      if (selector.toString().includes("increaseCount"))
        return mockIncreaseCount;
      if (selector.toString().includes("getCountPlusFishes"))
        return mockGetCountPlusFishes;
      return undefined;
    });

    render(<Count />);

    const button = screen.getByRole("button", { name: "Click" });
    expect(button).toHaveClass("mt-2");
  });

  it("should call getCountPlusFishes on render", () => {
    (useBoundStore as any).mockImplementation((selector: any) => {
      if (selector.toString().includes("count")) return 0;
      if (selector.toString().includes("increaseCount"))
        return mockIncreaseCount;
      if (selector.toString().includes("getCountPlusFishes"))
        return mockGetCountPlusFishes;
      return undefined;
    });

    render(<Count />);

    expect(mockGetCountPlusFishes).toHaveBeenCalled();
  });

  it("should handle alert dialog actions", () => {
    (useBoundStore as any).mockImplementation((selector: any) => {
      if (selector.toString().includes("count")) return 2; // even number
      if (selector.toString().includes("increaseCount"))
        return mockIncreaseCount;
      if (selector.toString().includes("getCountPlusFishes"))
        return mockGetCountPlusFishes;
      return undefined;
    });

    render(<Count />);

    const button = screen.getByRole("button", { name: "Click" });
    fireEvent.click(button);

    // Cancel 버튼 클릭
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);

    // Alert dialog가 닫혔는지 확인
    expect(
      screen.queryByText("Are you absolutely sure?"),
    ).not.toBeInTheDocument();
  });
});
