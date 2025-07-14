export interface ChatMessage {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface ConversationContext {
  id: string;
  content: string;
  lastUpdated: Date;
  summary?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  currentInput: string;
  isLoading: boolean;
  context: ConversationContext | null;
}
