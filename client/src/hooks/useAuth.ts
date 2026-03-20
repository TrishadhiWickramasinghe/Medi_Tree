import { useState, useEffect } from 'react';
import type { User } from '../types';
import { getCurrentUser, logout } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  const signOut = () => {
    logout();
    setUser(null);
    window.location.href = '/login';
  };

  const isAdmin = user?.role === 'admin';
  const isStaff = user?.role === 'staff';
  const isAuthenticated = !!user;

  return { user, isAdmin, isStaff, isAuthenticated, signOut };
};