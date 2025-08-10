"use client";

import { AppLayout } from "@/platform/component/layout/AppLayout";
import ChatScreen from "@/modules/chat/view/screen/ChatScreen";
import React from "react";

export default function ChatPage() {
  return (
    <AppLayout>
      <ChatScreen />
    </AppLayout>
  );
}
