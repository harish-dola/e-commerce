import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../api/client';

const AuthContext = createContext(null);

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

export function AuthProvider({ children }) {
  const [token, setToken] = useState(storedToken || '');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  async function authenticate(mode, payload) {
    setInitializing(true);
    try {
      const response = mode === 'login' ? await apiClient.login(payload) : await apiClient.signup(payload);
      setToken(response.access_token);
      setUser(response.user);
      return response;
    } finally {
      setInitializing(false);
    }
  }

  function logout() {
    setToken('');
    setUser(null);
  }

  const value = {
    token,
    user,
    initializing,
    isAuthenticated: Boolean(token),
    login: (payload) => authenticate('login', payload),
    signup: (payload) => authenticate('signup', payload),
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
