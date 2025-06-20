import { FetchTodosRequestParams, FetchTodosResponse } from '../types';

export const fetchTodos = async ({
  page,
  limit,
}: FetchTodosRequestParams): Promise<FetchTodosResponse> => {
  let path = `https://jsonplaceholder.typicode.com/todos`;

  if (page && limit) {
    path += `?_page=${page}&_limit=${limit}`;
  }

  const response = await fetch(path);

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return response.json();
};
