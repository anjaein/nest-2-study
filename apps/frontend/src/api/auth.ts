import { apiClient } from './client';

export const authApi = {
  login: (data: { email: string; password: string }) => 
    apiClient<{ accessToken: string }>('/auth/login', { data }),
  
  register: (data: { email: string; password: string; nickname: string }) => 
    apiClient<{ id: number; email: string; nickname: string }>('/auth/register', { data }),
};

export interface User {
  id: number;
  nickname: string;
  gold: number;
  gem: number;
}

export const usersApi = {
  getMe: () => apiClient<User>('/users/me'),
};
