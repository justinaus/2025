import { beforeEach, describe, expect, it, vi } from "vitest";

import { DEFAULT_LIMIT, fetchTodos } from "./api";

describe("fetchTodos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch todos with pagination", async () => {
    const mockTodos = [
      { userId: 1, id: 1, title: "Test todo 1", completed: false },
      { userId: 1, id: 2, title: "Test todo 2", completed: true },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockTodos,
    });

    const result = await fetchTodos({ page: 1, limit: 10 });

    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10",
    );
    expect(result).toEqual(mockTodos);
  });

  it("should fetch todos without pagination", async () => {
    const mockTodos = [
      { userId: 1, id: 1, title: "Test todo", completed: false },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockTodos,
    });

    const result = await fetchTodos({});

    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos",
    );
    expect(result).toEqual(mockTodos);
  });

  it("should throw error when fetch fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(fetchTodos({ page: 1, limit: 10 })).rejects.toThrow(
      "Failed to fetch todos",
    );
  });

  it("should throw error when network error occurs", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    await expect(fetchTodos({ page: 1, limit: 10 })).rejects.toThrow(
      "Network error",
    );
  });

  it("should use correct URL with page and limit", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    await fetchTodos({ page: 2, limit: 5 });

    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos?_page=2&_limit=5",
    );
  });
});

describe("DEFAULT_LIMIT", () => {
  it("should be 10", () => {
    expect(DEFAULT_LIMIT).toBe(10);
  });
});
