import AuthGuard from "@/platform/auth/AuthGuard";

export default function Home() {
  return <AuthGuard />;
}
