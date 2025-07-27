"use client";

import { CookiesProvider } from "react-cookie";

interface CookiesWrapperProps {
  children: React.ReactNode;
}

export function CookiesWrapper({ children }: CookiesWrapperProps) {
  return <CookiesProvider>{children}</CookiesProvider>;
}