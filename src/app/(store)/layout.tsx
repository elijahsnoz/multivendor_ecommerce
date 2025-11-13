// React
import { ReactNode } from "react";

// Toaster
import { Toaster } from "react-hot-toast";

// AI Shopping Assistant
import FloatingAIChat from "@/components/store/floating-ai-chat";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      <Toaster position="top-center" />
      <FloatingAIChat />
    </div>
  );
}
