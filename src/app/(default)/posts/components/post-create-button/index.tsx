'use client';

import { useTransition } from 'react';
import { twMerge } from 'tailwind-merge';

import { createPost } from './actions';

type Props = Pick<React.ComponentProps<'button'>, 'className'>;

export function PostCreateButton({ className }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await createPost({
        userId: 1,
        title: 'New Post',
        body: 'This is the body of the new post.',
      });

      if (result.success) {
        alert('포스트가 생성되었습니다!');
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <button
      className={twMerge(className, 'text-blue-500')}
      disabled={isPending}
      onClick={handleClick}
    >
      Create Post
    </button>
  );
}
