
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  resetPassword: (email: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo - in real app this would be from your backend
const mockUsers: User[] = [
  {
    id: '1',
    email: 'client@demo.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    role: 'client',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    id: '2',
    email: 'agent@demo.com',
    firstName: 'Marie',
    lastName: 'Martin',
    role: 'agent',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    id: '3',
    email: 'admin@demo.com',
    firstName: 'Pierre',
    lastName: 'Bernard',
    role: 'admin',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userExists = mockUsers.some(u => u.email === email);
    return userExists;
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true; // Always succeed for demo
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateUser,
      resetPassword,
      changePassword,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
