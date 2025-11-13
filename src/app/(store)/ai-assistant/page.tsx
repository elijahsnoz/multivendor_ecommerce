import AIShoppingAssistant from "@/components/store/ai-shopping-assistant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Shopping Assistant | Smart Product Search",
  description: "Use AI to find the perfect products with natural language search",
};

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Shopping Assistant
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Just tell me what you&apos;re looking for in plain English, and I&apos;ll help you find the perfect products!
        </p>
      </div>
      
      <AIShoppingAssistant />
      
      <div className="mt-8 max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            💡 Try these example queries:
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>&quot;Find red sneakers under $50 with 4+ stars&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>&quot;Show me affordable laptops from Dell&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>&quot;I need a blue dress for a wedding&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>&quot;Find wireless headphones with good ratings&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>&quot;Show me black leather jackets under $100&quot;</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
