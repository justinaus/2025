'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';

import { DEFAULT_LIMIT, fetchTodos, FetchTodosResponse } from '../../lib/api';

type Props = {
  initialData: FetchTodosResponse;
};

export function TodosList({ initialData }: Props) {
  const {
    data,
    // error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    // isFetchingNextPage,
    // status,
  } = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: ({ pageParam = 2 }) =>
      fetchTodos({ page: pageParam, limit: DEFAULT_LIMIT }),
    getNextPageParam: (lastPage, allPages) => {
      // jsonplaceholder는 총 100개의 포스트가 있다고 가정
      // 실제로는 API 응답에서 hasNextPage나 totalCount를 확인해야 합니다
      if (lastPage.length < DEFAULT_LIMIT) {
        return undefined; // 더 이상 페이지가 없음
      }

      return allPages.length + 1;
    },
    initialPageParam: 2, // initialData가 1페이지이므로 다음 페이지부터 시작
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
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
        <Button
          variant={'filled'}
          size={'md'}
          className="border-2"
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        >
          More
        </Button>
      )}
    </div>
  );
}
