"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/platform/component/ui/avatar";
import {
  Building,
  FileText,
  Home,
  LogOut,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Sparkles,
  User,
} from "lucide-react";
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
} from "@/platform/component/ui/sidebar";

import { Button } from "@/platform/component/ui/button";
import { Input } from "@/platform/component/ui/input";
import { Label } from "@/platform/component/ui/label";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/platform/auth/AuthContext";
import { usePathname } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

// Simple login form for demo purposes
function LoginForm() {
  const { login } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      login({
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=random`,
      });
    }
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
          <form onSubmit={handleLogin} className="space-y-4">
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
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Demo app - Enter any name and email to continue
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
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Overview and quick actions",
  },
  {
    title: "AI Chat",
    href: "/chat",
    icon: MessageCircle,
    description: "Build resume through conversation",
  },
  {
    title: "Resume Builder",
    href: "/editor",
    icon: FileText,
    description: "Manual resume creation and editing",
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
  const { logout } = useAuth();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FileText className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">RaysumeAI</span>
                  <span className="truncate text-xs">AI Resume Builder</span>
                </div>
              </Link>
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
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <MoreHorizontal className="size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem className="gap-2">
                    <User className="size-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2 text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={logout}
                  >
                    <LogOut className="size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}

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
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <SidebarProvider>
      <AppLayoutContent user={user}>{children}</AppLayoutContent>
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
