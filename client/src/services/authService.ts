import api from './api';
import type { User } from '../types';

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  const { token, user } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return { token, user };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getMe = async (): Promise<User> => {
  const res = await api.get('/auth/me');
  return res.data.user;
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};