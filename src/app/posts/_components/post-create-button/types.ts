export type CreatePostRequest = {
  userId: number;
  title: string;
  body: string;
};

export type CreatePostResponse = {
  userId: number;
  title: string;
  body: string;
  id: number;
};
