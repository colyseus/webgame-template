import React, { createContext, useContext, useEffect, useState } from 'react';
import { client } from '../core/Networking';
import type { User } from '../../../backend/src/config/database';

interface AuthContextType {
  user: User | null;
  isLoading: boolean,
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => { }
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => client.auth.signOut();

  useEffect(() => {
    const unsubscribe = client.auth.onChange((authData) => {
      setIsLoading(false);
      setUser(authData?.user || null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
