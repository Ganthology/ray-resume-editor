import { MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ChatCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/chat"
        className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-primary/20"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Chat to Build Resume</span>
        </div>
        <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
      </Link>
    </div>
  );
}
