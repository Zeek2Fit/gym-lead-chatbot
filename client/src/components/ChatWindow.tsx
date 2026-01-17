import { X, Minus, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ConversationFlow from "./ConversationFlow";
import { brandName, tagline } from "@shared/config";

interface ChatWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

export default function ChatWindow({ onClose, onMinimize }: ChatWindowProps) {
  return (
    <Card className="w-full h-full flex flex-col bg-card border-0 md:border rounded-none md:rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 bg-primary border-b border-primary-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
            <Dumbbell className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base text-primary-foreground" data-testid="text-chat-title">
              {brandName}
            </h2>
            <p className="text-xs text-primary-foreground/80">
              {tagline}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={onMinimize}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10 no-default-hover-elevate hover-elevate"
            data-testid="button-minimize-chat"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10 no-default-hover-elevate hover-elevate"
            data-testid="button-close-chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ConversationFlow />
    </Card>
  );
}
