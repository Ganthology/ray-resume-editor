"use client";

import React from "react";
import { useAuth } from "./AuthContext";
import LandingScreen from "../landing/LandingScreen";
import { useRouter } from "next/navigation";

export default function AuthGuard() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-2xl font-bold text-stone-900">RaysumeAI</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }
  
  return <LandingScreen />;
}