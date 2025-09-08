import { apiDelete, apiGet, apiPost, apiPut } from './apiClient'
import type { NewUser, User } from '../types/user'

export async function getUsers(): Promise<User[]> {
  return apiGet<User[]>('/users')
}

export async function createUser(payload: NewUser): Promise<User> {
  return apiPost<User>('/users', payload)
}

export async function updateUser(id: number, payload: Partial<NewUser>): Promise<User> {
  return apiPut<User>(`/users/${id}`, payload)
}

export async function deleteUser(id: number): Promise<void> {
  return apiDelete(`/users/${id}`)
}


