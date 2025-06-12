import React, { createContext, useContext } from 'react';

export type UserRole = 'user' | 'admin' | 'superadmin';

interface UserContextType {
  role: UserRole;
}

// Mock: set role to 'superadmin' for now. Change to 'user' to test unauthorized access.
const UserContext = createContext<UserContextType>({ role: 'superadmin' });

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In a real app, get role from auth/user API
  const value: UserContextType = { role: 'superadmin' };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}; 