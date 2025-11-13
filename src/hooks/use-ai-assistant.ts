"use client";

import { useState } from "react";

interface UseAIAssistantResult {
  query: string;
  isLoading: boolean;
  error: string | null;
  products: any[];
  message: string;
  searchProducts: (userQuery: string) => Promise<void>;
  reset: () => void;
}

export function useAIAssistant(): UseAIAssistantResult {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const searchProducts = async (userQuery: string) => {
    setQuery(userQuery);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery }),
      });

      if (!response.ok) {
        throw new Error("Failed to search products");
      }

      const data = await response.json();
      setProducts(data.products || []);
      setMessage(data.message || "");
    } catch (err: any) {
      setError(err.message);
      setProducts([]);
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setQuery("");
    setError(null);
    setProducts([]);
    setMessage("");
  };

  return {
    query,
    isLoading,
    error,
    products,
    message,
    searchProducts,
    reset,
  };
}
