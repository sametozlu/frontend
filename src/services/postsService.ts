import { apiDelete, apiGet, apiPost, apiPut } from './apiClient'
import type { NewPost, Post } from '../types/post'

export async function getPosts(): Promise<Post[]> {
  return apiGet<Post[]>('/posts')
}

export async function getPostsByUser(userId: number): Promise<Post[]> {
  return apiGet<Post[]>(`/posts?userId=${userId}`)
}

export async function createPost(payload: NewPost): Promise<Post> {
  return apiPost<Post>('/posts', payload)
}

export async function updatePost(id: number, payload: Partial<NewPost>): Promise<Post> {
  return apiPut<Post>(`/posts/${id}`, payload)
}

export async function deletePost(id: number): Promise<void> {
  return apiDelete(`/posts/${id}`)
}


