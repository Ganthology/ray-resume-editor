"use client";

import React from "react";
import { SidebarLayout } from "../sidebar/SidebarLayout";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return <SidebarLayout>{children}</SidebarLayout>;
}

// Higher-order component for pages that need the app layout
export function withAppLayout<P extends object>(
  Component: React.ComponentType<P>
) {
  return function LayoutWrappedComponent(props: P) {
    return (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    );
  };
}
