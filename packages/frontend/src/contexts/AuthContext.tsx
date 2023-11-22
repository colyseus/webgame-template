import React, { createContext, useContext, useEffect, useState } from 'react';

// TODO: bring your user model here
interface User {
  id: string;
  email: string;
  displayName: string;
}

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
    // signOut(auth);
    // setUser(null);
  };

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged(authUser => {
    //   console.log("onAuthStateChanged =>", authUser);

    //   setIsLoading(false);
    //   setUser(authUser);
    // });

    // return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
