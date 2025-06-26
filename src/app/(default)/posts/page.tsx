import Link from 'next/link';

import { Count } from '@/components/common/count';

import { PostCreateButton } from './components/post-create-button';
import { FetchPostsResponse } from './types';

export default async function Posts() {
  const data = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10',
  );
  const posts: FetchPostsResponse = await data.json();

  return (
    <main>
      <h1 className="mb-4">Posts</h1>
      <PostCreateButton className="mb-2" />
      <ul>
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <li key={post.id}>{post.title}</li>
          </Link>
        ))}
      </ul>
      <Count />
    </main>
  );
}
