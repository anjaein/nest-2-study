import { apiClient } from './client';

export interface Todo {
  id: number;
  title: string;
  scheduledTime: string;
  isCompleted: boolean;
  rewardGold?: number;
  completedAt?: string;
  createdAt?: string;
}

export const todosApi = {
  getTodos: () => apiClient<Todo[]>('/todos'),
  createTodo: (data: { title: string; scheduledTime: string }) => apiClient<Todo>('/todos', { data }),
  updateTodo: (id: number, data: Partial<{ title: string; scheduledTime: string }>) => apiClient<Todo>(`/todos/${id}`, { method: 'PATCH', data }),
  deleteTodo: (id: number) => apiClient<{ message: string }>(`/todos/${id}`, { method: 'DELETE' }),
  completeTodo: (id: number) => apiClient<Todo>(`/todos/${id}/complete`, { method: 'PATCH' }),
};
