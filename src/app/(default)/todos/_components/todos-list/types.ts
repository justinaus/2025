export type FetchTodosResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}[];

export type FetchTodosRequestParams = {
  page?: number;
  limit?: number;
};
