'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { FetchTodosRequestParams, FetchTodosResponse } from './types';

const fetchPosts = async ({
  page,
  limit,
}: FetchTodosRequestParams): Promise<FetchTodosResponse> => {
  let path = `https://jsonplaceholder.typicode.com/todos`;

  if (page && limit) {
    path += `?_page=${page}&_limit=${limit}`;
  }

  const response = await fetch(path);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
};

const LIMIT = 10;

export function TodosList() {
  const {
    data,
    // error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    // isFetchingNextPage,
    // status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) =>
      fetchPosts({ page: pageParam, limit: LIMIT }),
    getNextPageParam: (lastPage, allPages) => {
      // jsonplaceholder는 총 100개의 포스트가 있다고 가정
      // 실제로는 API 응답에서 hasNextPage나 totalCount를 확인해야 합니다
      if (lastPage.length < LIMIT) {
        return undefined; // 더 이상 페이지가 없음
      }

      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  const todos = data?.pages.flat() || [];

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetching}>
          More
        </button>
      )}
    </div>
  );
}
