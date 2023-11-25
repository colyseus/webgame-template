import React, { createContext, useContext, useEffect, useState } from 'react';
import { client } from '../core/Networking';
import type { User } from '../../../backend/src/config/database';

interface AuthContextType {
  user: User | null;
  isLoading: boolean,
  // login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  // login: () => { },
  logout: () => { }
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // const login = (userData: User) => {
  //   setUser(userData);
  // };

  const logout = () => {
    client.auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = client.auth.onChange((authData) => {
      setIsLoading(false);
      setUser(authData?.user || null);
      console.log("SET USER DATA!", authData?.user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
