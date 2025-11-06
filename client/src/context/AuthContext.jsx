import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For initial load

  useEffect(() => {
    // Check if user is already logged in (on page refresh)
    const checkUser = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setUser(data);
        setIsLoggedIn(true);
      } catch (err) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data.user);
    setIsLoggedIn(true);
    return data;
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post('/auth/signup', { name, email, password });
    return data; // Just returns success, doesn't auto-login
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use this context
export const useAuth = () => {
  return useContext(AuthContext);
};