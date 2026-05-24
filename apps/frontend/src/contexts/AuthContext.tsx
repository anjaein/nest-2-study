import React, { createContext, useContext, useEffect, useState } from 'react';
import { usersApi } from '../api/auth';
import type { User } from '../api/auth';
import { getAuthToken, removeAuthToken, setAuthToken } from '../api/client';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userData = await usersApi.getMe();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user', error);
      removeAuthToken();
      setUser(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (token) {
        await fetchUser();
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (token: string) => {
    setAuthToken(token);
    await fetchUser();
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
