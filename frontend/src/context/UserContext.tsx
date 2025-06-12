import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import type { AuthUser } from '../services/authService';
import type { ReactNode } from 'react';

interface UserContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(authService.getUser());
  const [token, setToken] = useState<string | null>(authService.getToken());

  useEffect(() => {
    setUser(authService.getUser());
    setToken(authService.getToken());
  }, []);

  const login = async (email: string, password: string) => {
    const authUser = await authService.login(email, password);
    setUser(authUser);
    setToken(authUser.token);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}; 