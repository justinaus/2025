import { FetchPostCommentsResponse } from './types';

export async function Comments({ postId }: { postId: string }) {
  const comments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
  );
  const data: FetchPostCommentsResponse = await comments.json();

  return (
    <div>
      <h2>Comments</h2>
      {data.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export function CommentItem({
  comment,
}: {
  comment: FetchPostCommentsResponse[number];
}) {
  return <div>{comment.name}</div>;
}

export function CommentsSkeleton() {
  return <div>Skeleton</div>;
}
