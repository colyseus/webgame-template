import React, { createContext, useContext, useEffect, useState } from 'react';
import Network from '../core/Network';
import type { User } from '../../../backend/src/config/database';
import { getEmbeddedDiscordAuth, isEmbedded as isDiscordEmbeddedActivity } from '../core/DiscordSDK';

interface AuthContextType {
  user: Partial<User> | null;
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

  const logout = () => Network.client.auth.signOut();

  useEffect(() => {
    //
    // Discord Embedded Activity
    //
    if (isDiscordEmbeddedActivity) {
      getEmbeddedDiscordAuth().then((auth) => {
        console.log("Embedded Discord user", auth);

        setUser({
          // @ts-ignore
          id: auth.user.id,
          name: auth.user.username,
        });

      }).catch(() => {
        setUser(null);
      });

    } else {
      //
      // Regular Web App
      //
      const unsubscribe = Network.client.auth.onChange((authData) => {
        setIsLoading(false);
        setUser(authData?.user || null);
      });

      return () => unsubscribe();
    }

  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
