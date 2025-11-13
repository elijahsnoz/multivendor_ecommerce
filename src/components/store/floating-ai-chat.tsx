"use client";

import { useState } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIShoppingAssistant from "./ai-shopping-assistant";

export default function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all hover:scale-110"
        size="icon"
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-7 w-7" />
            <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300" />
          </div>
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[95vw] max-w-[450px] h-[600px] z-40 shadow-2xl rounded-lg overflow-hidden border-2 border-blue-500 animate-in slide-in-from-bottom-5">
          <AIShoppingAssistant />
        </div>
      )}
    </>
  );
}
