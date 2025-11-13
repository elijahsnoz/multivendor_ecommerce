"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ShoppingBag, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: ProductResult[];
  timestamp: Date;
}

interface ProductResult {
  id: string;
  name: string;
  description: string;
  slug: string;
  brand: string;
  rating: number;
  numReviews: number;
  category: { name: string };
  subCategory: { name: string };
  store: {
    name: string;
    url: string;
    logo: string;
  };
  variants: Array<{
    id: string;
    variantName: string;
    variantImage: string;
    slug: string;
    sizes: Array<{
      id: string;
      size: string;
      price: number;
      discount: number;
      quantity: number;
    }>;
  }>;
}

export default function AIShoppingAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! 👋 I'm your AI shopping assistant. Ask me to find products like 'Show me red sneakers under $50' or 'Find laptops with 4+ star ratings'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Calculate discounted price
  const getDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  // Get minimum price from product variants
  const getMinPrice = (product: ProductResult) => {
    const prices = product.variants.flatMap(variant =>
      variant.sizes.map(size => getDiscountedPrice(size.price, size.discount))
    );
    return Math.min(...prices);
  };

  // Handle sending a message
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: input,
          conversationHistory: messages.slice(-6).map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        products: data.products || [],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-5xl mx-auto">
      <Card className="flex-1 flex flex-col shadow-xl border-2">
        <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Shopping Assistant</h2>
              <p className="text-sm text-white/80">
                Ask me anything about products in our store
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id}>
                  {/* Message bubble */}
                  <div
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Product results */}
                  {message.products && message.products.length > 0 && (
                    <div className="mt-4 ml-11">
                      <div className="flex items-center gap-2 mb-3">
                        <ShoppingBag className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Found {message.products.length} product
                          {message.products.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {message.products.slice(0, 6).map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="group"
                          >
                            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500">
                              <div className="relative aspect-square bg-gray-100">
                                {product.variants[0]?.variantImage ? (
                                  <Image
                                    src={product.variants[0].variantImage}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ShoppingBag className="w-16 h-16 text-gray-300" />
                                  </div>
                                )}
                                {product.variants[0]?.sizes[0]?.discount > 0 && (
                                  <Badge className="absolute top-2 right-2 bg-red-500">
                                    -{product.variants[0].sizes[0].discount}%
                                  </Badge>
                                )}
                              </div>
                              <CardContent className="p-3">
                                <p className="text-xs text-gray-500 mb-1">
                                  {product.brand}
                                </p>
                                <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                                  {product.name}
                                </h3>
                                <div className="flex items-center gap-1 mb-2">
                                  <div className="flex text-yellow-400">
                                    {"★".repeat(Math.floor(product.rating))}
                                    {"☆".repeat(5 - Math.floor(product.rating))}
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    ({product.numReviews})
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-lg font-bold text-blue-600">
                                      ${getMinPrice(product).toFixed(2)}
                                    </p>
                                    {product.variants[0]?.sizes[0]?.discount > 0 && (
                                      <p className="text-xs text-gray-400 line-through">
                                        ${product.variants[0].sizes[0].price.toFixed(2)}
                                      </p>
                                    )}
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {product.store.name}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                      {message.products.length > 6 && (
                        <Button variant="outline" className="w-full mt-4">
                          View all {message.products.length} results
                        </Button>
                      )}
                    </div>
                  )}

                  {message.products && message.products.length === 0 && message.role === "assistant" && (
                    <div className="mt-4 ml-11 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        No products found matching your criteria. Try adjusting your search!
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Searching products...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="border-t p-4">
          <div className="flex gap-2 w-full">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me to find products... e.g., 'red sneakers under $50'"
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
