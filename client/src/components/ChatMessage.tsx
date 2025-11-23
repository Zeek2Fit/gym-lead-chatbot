import { Dumbbell, User } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@shared/schema";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "bot";

  return (
    <div
      className={`flex gap-3 mb-4 animate-in slide-in-from-bottom-2 duration-300 ${
        isBot ? "justify-start" : "justify-end"
      }`}
      data-testid={`message-${message.role}`}
    >
      {isBot && (
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
          <Dumbbell className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      
      <div
        className={`px-4 py-3 max-w-[85%] ${
          isBot
            ? "bg-muted text-muted-foreground rounded-2xl rounded-tl-sm"
            : "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm max-w-[75%]"
        }`}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap" data-testid="text-message-content">
          {message.content}
        </p>
      </div>

      {!isBot && (
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
          <User className="h-4 w-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
}
