import { api, ApiResponse } from './api';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  roleId: string;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const authApi = {
  register: (body: RegisterRequest) =>
    api.post<string>('/auth/register', body),

  login: (body: LoginRequest) =>
    api.post<LoginResponse>('/auth/login', body),

  me: () =>
    api.get<User>('/auth/me'),

  updateProfile: (body: Partial<User>) =>
    api.put<User>('/auth/me', body),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.post<boolean>('/auth/change-password', { currentPassword, newPassword }),
};
