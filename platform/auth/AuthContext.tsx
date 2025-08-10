"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authClient } from "@/lib/auth-client";

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    id: string;
    email?: string | null;
    name?: string | null;
    imageUrl?: string | null;
  } | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    name?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    const unsub = authClient.onAuthStateChange(async (evt) => {
      if (evt?.user) {
        setUser({
          id: evt.user.id,
          email: evt.user.email ?? null,
          name: evt.user.name ?? null,
          imageUrl: evt.user.image ?? null,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    authClient.getSession().finally(() => setLoading(false));
    return () => unsub?.();
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      loading,
      signInWithEmail: async (email: string, password: string) => {
        setLoading(true);
        try {
          await authClient.signIn.email({ email, password });
        } finally {
          setLoading(false);
        }
      },
      signUpWithEmail: async (
        email: string,
        password: string,
        name?: string
      ) => {
        setLoading(true);
        try {
          await authClient.signUp.email({ email, password, name });
        } finally {
          setLoading(false);
        }
      },
      signOut: async () => {
        await authClient.signOut();
        setUser(null);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
