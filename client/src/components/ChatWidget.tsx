import { useState, useEffect } from "react";
import { MessageCircle, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setHasUnread(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <Button
            size="icon"
            onClick={handleOpen}
            className="h-16 w-16 rounded-full bg-primary hover:bg-primary shadow-lg transition-all duration-300 hover:scale-110 active-elevate-2"
            data-testid="button-open-chat"
          >
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
            {hasUnread && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-destructive border-2 border-background animate-pulse" />
            )}
          </Button>
        </div>
      )}

      {isOpen && !isMinimized && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-[9999] w-full h-full md:w-[400px] md:h-[600px] md:rounded-lg shadow-2xl overflow-hidden">
          <ChatWindow onClose={handleClose} onMinimize={handleMinimize} />
        </div>
      )}

      {isOpen && isMinimized && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <Button
            size="icon"
            onClick={() => setIsMinimized(false)}
            className="h-16 w-16 rounded-full bg-primary hover:bg-primary shadow-lg transition-all duration-300 hover:scale-110 active-elevate-2"
            data-testid="button-restore-chat"
          >
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
          </Button>
        </div>
      )}
    </>
  );
}
