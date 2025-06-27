import { beforeEach, describe, expect, it, vi } from "vitest";

import { createPost } from "./actions";
import { CreatePostRequest } from "./types";

// Next.js의 revalidatePath 모킹
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("createPost", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create post successfully", async () => {
    const mockResponse = {
      id: 101,
      title: "Test Post",
      body: "Test Body",
      userId: 1,
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const requestData: CreatePostRequest = {
      title: "Test Post",
      body: "Test Body",
      userId: 1,
    };

    const result = await createPost(requestData);

    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      },
    );

    expect(result).toEqual({
      success: true,
      data: mockResponse,
    });
  });

  it("should handle HTTP error response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    });

    const requestData: CreatePostRequest = {
      title: "Test Post",
      body: "Test Body",
      userId: 1,
    };

    const result = await createPost(requestData);

    expect(result).toEqual({
      success: false,
      error: "HTTP 400: Bad Request",
    });
  });

  it("should handle network error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const requestData: CreatePostRequest = {
      title: "Test Post",
      body: "Test Body",
      userId: 1,
    };

    const result = await createPost(requestData);

    expect(result).toEqual({
      success: false,
      error: "Network error",
    });
  });

  it("should handle unknown error", async () => {
    global.fetch = vi.fn().mockRejectedValue("Unknown error");

    const requestData: CreatePostRequest = {
      title: "Test Post",
      body: "Test Body",
      userId: 1,
    };

    const result = await createPost(requestData);

    expect(result).toEqual({
      success: false,
      error: "알 수 없는 오류가 발생했습니다.",
    });
  });

  it("should call revalidatePath after successful creation", async () => {
    const { revalidatePath } = await import("next/cache");

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 101, title: "Test", body: "Test", userId: 1 }),
    });

    const requestData: CreatePostRequest = {
      title: "Test Post",
      body: "Test Body",
      userId: 1,
    };

    await createPost(requestData);

    expect(revalidatePath).toHaveBeenCalledWith("/posts");
  });

  it("should not call revalidatePath on error", async () => {
    const { revalidatePath } = await import("next/cache");

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const requestData: CreatePostRequest = {
      title: "Test Post",
      body: "Test Body",
      userId: 1,
    };

    await createPost(requestData);

    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
