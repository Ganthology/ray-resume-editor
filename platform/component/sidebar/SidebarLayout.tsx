"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/platform/component/ui/avatar";
import { Building, CreditCard, FileText, LogOut, Mail, MoreHorizontal, Sparkles, User } from "lucide-react";
// Keep Card usage for auth/login UI (borders are fine here)
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/platform/component/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/platform/component/ui/sidebar";

import { Button } from "@/platform/component/ui/button";
import { Input } from "@/platform/component/ui/input";
import { Label } from "@/platform/component/ui/label";
import Link from "next/link";
import React from "react";
// Auth removed
import { usePathname } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

// Simple login form for demo purposes
function LoginForm() {
  // No-op auth
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mode, setMode] = React.useState<"signin" | "signup">("signin");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // No auth logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to RaysumeAI</CardTitle>
          <CardDescription>
            Sign in to access your AI-powered resume builder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="w-full">
                {mode === "signup" ? "Create account" : "Sign in"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              >
                {mode === "signup"
                  ? "Have an account? Sign in"
                  : "Create account"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Use email/password to continue
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Loading component
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground animate-pulse">
          <FileText className="h-6 w-6" />
        </div>
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    </div>
  );
}

const navigationItems = [
  {
    title: "Resume Builder",
    href: "/editor",
    icon: FileText,
    description: "Manual resume creation and editing",
  },
];

const settingsItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
    description: "Manage your profile and saved contexts",
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
    description: "Subscription and billing settings",
  },
];

const comingSoonItems = [
  {
    title: "Job Application Helper",
    icon: Building,
    description: "Coming soon",
  },
  {
    title: "Interview Prep",
    icon: Sparkles,
    description: "Coming soon",
  },
];

function AppSidebar({
  user,
}: {
  user?: { name: string; email: string; avatar?: string };
}) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={toggleSidebar}
              className="cursor-pointer"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileText className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">RaysumeAI</span>
                <span className="truncate text-xs">AI Resume Builder</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.description}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>More Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {comingSoonItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton tooltip={item.description} disabled>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.description}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user actions removed (no auth) */}

      <SidebarRail />
    </Sidebar>
  );
}

function AppLayoutContent({
  children,
  user,
  withTrigger = false,
}: {
  children: React.ReactNode;
  user?: { name: string; email: string; avatar?: string };
  withTrigger?: boolean;
}) {
  return (
    <>
      <AppSidebar user={user} />
      <SidebarInset>
        {withTrigger && (
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
        )}
        <div className="flex flex-1 flex-col gap-4">{children}</div>
      </SidebarInset>
    </>
  );
}

export function SidebarLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}

// Higher-order component for pages that need the app layout
export function withSidebarLayout<P extends object>(
  Component: React.ComponentType<P>
) {
  return function LayoutWrappedComponent(props: P) {
    return (
      <SidebarLayout>
        <Component {...props} />
      </SidebarLayout>
    );
  };
}
