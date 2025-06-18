import { notFound } from 'next/navigation';

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

  return <div>{post.title}</div>;
}
