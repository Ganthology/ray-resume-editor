"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth state in localStorage
    const checkAuthState = () => {
      try {
        const storedAuth = localStorage.getItem("raysumeai_auth");
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          setIsAuthenticated(authData.isAuthenticated);
          setUser(authData.user);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
    // Store auth state in localStorage
    localStorage.setItem(
      "raysumeai_auth",
      JSON.stringify({
        isAuthenticated: true,
        user: userData,
      })
    );
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Remove auth state from localStorage
    localStorage.removeItem("raysumeai_auth");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}