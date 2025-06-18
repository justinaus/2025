import Link from 'next/link';

import { FetchPostsResponse } from './types';

export default async function Posts() {
  const data = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10',
  );
  const posts: FetchPostsResponse = await data.json();

  return (
    <ul>
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <li key={post.id}>{post.title}</li>
        </Link>
      ))}
    </ul>
  );
}
