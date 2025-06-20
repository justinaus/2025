import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Comments, CommentsSkeleton } from './components/comments';
import { FetchPostResponse } from './types';

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!data.ok) {
    notFound();
  }

  const post: FetchPostResponse = await data.json();

  return (
    <main>
      <h1 className="mb-4">{post.title}</h1>
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments postId={id} />
      </Suspense>
    </main>
  );
}
