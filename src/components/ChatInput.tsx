import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-border bg-card p-4">
      <div className="mx-auto flex max-w-4xl gap-4">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about drug discovery, mechanisms of action, or research methods..."
          className="min-h-[60px] resize-none"
          disabled={disabled}
        />
        <Button
          type="submit"
          size="icon"
          className="h-[60px] w-[60px] shrink-0"
          disabled={disabled || !message.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};
