"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;

  login: (email: string, password: string) => void;

  register: (name: string, email: string, password: string) => void;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  // Restore user on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("instagram-user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function saveUser(newUser: User) {
    setUser(newUser);

    localStorage.setItem("instagram-user", JSON.stringify(newUser));
  }

  function login(email: string, password: string) {
    const newUser = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
    };

    saveUser(newUser);
  }

  function register(name: string, email: string, password: string) {
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
    };

    saveUser(newUser);
  }

  function logout() {
    setUser(null);

    localStorage.removeItem("instagram-user");
  }

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
