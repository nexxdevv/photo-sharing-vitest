"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;

  login: (email: string, password: string) => void;

  register: (
    name: string,
    email: string,
    password: string
  ) => void;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  function login(email: string) {
    setUser({
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
    });
  }

  function register(name: string, email: string) {
    setUser({
      id: crypto.randomUUID(),
      name,
      email,
    });
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}