"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to chat as the default entry point
    router.push('/chat');
  }, [router]);

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
