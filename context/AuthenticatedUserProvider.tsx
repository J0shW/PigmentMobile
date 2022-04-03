import React, { useState, createContext } from 'react';
import firebase from 'firebase/compat/app';

interface IAuth {
  user: firebase.User | null;
  setUser: React.Dispatch<React.SetStateAction<firebase.User | null>>;
}

export const AuthenticatedUserContext = createContext<IAuth>({} as any);

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};