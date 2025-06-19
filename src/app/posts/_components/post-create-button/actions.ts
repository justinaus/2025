'use server';

import { revalidatePath } from 'next/cache';

import { ActionResult } from '@/types/action';

import { CreatePostRequest, CreatePostResponse } from './types';

export async function createPost(
  requestData: CreatePostRequest,
): Promise<ActionResult<CreatePostResponse>> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();

    // 추가 작업들
    revalidatePath('/posts');

    return { success: true, data };
  } catch (error) {
    console.error('Post creation failed:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
    };
  }
}
