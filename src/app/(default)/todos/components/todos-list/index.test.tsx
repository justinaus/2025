import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FetchTodosResponse } from "../../lib/api";
import { TodosList } from "./index";

// TanStack Query 모킹
vi.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: vi.fn(),
}));

// Button 컴포넌트 모킹
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, disabled, className }: any) => (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  ),
}));

describe("TodosList Component", () => {
  const mockInitialData: FetchTodosResponse = [
    { userId: 1, id: 1, title: "Todo 1", completed: false },
    { userId: 1, id: 2, title: "Todo 2", completed: true },
  ];

  const mockFetchNextPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render initial todos", () => {
    const { useInfiniteQuery } = require("@tanstack/react-query");
    useInfiniteQuery.mockReturnValue({
      data: { pages: [mockInitialData] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetching: false,
    });

    render(<TodosList initialData={mockInitialData} />);

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });

  it('should render "More" button when hasNextPage is true', () => {
    const { useInfiniteQuery } = require("@tanstack/react-query");
    useInfiniteQuery.mockReturnValue({
      data: { pages: [mockInitialData] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetching: false,
    });

    render(<TodosList initialData={mockInitialData} />);

    const moreButton = screen.getByRole("button", { name: "More" });
    expect(moreButton).toBeInTheDocument();
    expect(moreButton).not.toBeDisabled();
  });

  it('should not render "More" button when hasNextPage is false', () => {
    const { useInfiniteQuery } = require("@tanstack/react-query");
    useInfiniteQuery.mockReturnValue({
      data: { pages: [mockInitialData] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetching: false,
    });

    render(<TodosList initialData={mockInitialData} />);

    expect(
      screen.queryByRole("button", { name: "More" }),
    ).not.toBeInTheDocument();
  });

  it('should call fetchNextPage when "More" button is clicked', () => {
    const { useInfiniteQuery } = require("@tanstack/react-query");
    useInfiniteQuery.mockReturnValue({
      data: { pages: [mockInitialData] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetching: false,
    });

    render(<TodosList initialData={mockInitialData} />);

    const moreButton = screen.getByRole("button", { name: "More" });
    fireEvent.click(moreButton);

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('should disable "More" button when isFetching is true', () => {
    const { useInfiniteQuery } = require("@tanstack/react-query");
    useInfiniteQuery.mockReturnValue({
      data: { pages: [mockInitialData] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetching: true,
    });

    render(<TodosList initialData={mockInitialData} />);

    const moreButton = screen.getByRole("button", { name: "More" });
    expect(moreButton).toBeDisabled();
  });

  it("should render multiple pages of todos", () => {
    const secondPageData: FetchTodosResponse = [
      { userId: 1, id: 3, title: "Todo 3", completed: false },
      { userId: 1, id: 4, title: "Todo 4", completed: true },
    ];

    const { useInfiniteQuery } = require("@tanstack/react-query");
    useInfiniteQuery.mockReturnValue({
      data: { pages: [mockInitialData, secondPageData] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetching: false,
    });

    render(<TodosList initialData={mockInitialData} />);

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Todo 3")).toBeInTheDocument();
    expect(screen.getByText("Todo 4")).toBeInTheDocument();
  });

  it("should render empty state when no todos", () => {
    const { useInfiniteQuery } = require("@tanstack/react-query");
    useInfiniteQuery.mockReturnValue({
      data: { pages: [[]] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetching: false,
    });

    render(<TodosList initialData={[]} />);

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("should render todos as list items", () => {
    const { useInfiniteQuery } = require("@tanstack/react-query");
    useInfiniteQuery.mockReturnValue({
      data: { pages: [mockInitialData] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetching: false,
    });

    render(<TodosList initialData={mockInitialData} />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });

  it("should handle loading state", () => {
    const { useInfiniteQuery } = require("@tanstack/react-query");
    useInfiniteQuery.mockReturnValue({
      data: undefined,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetching: true,
    });

    render(<TodosList initialData={[]} />);

    // 로딩 상태에서는 빈 배열이 렌더링됨
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
