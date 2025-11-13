# AI Shopping Assistant - Setup & Integration Guide

## 🎉 What's Been Implemented

A fully functional AI Shopping Assistant for your Next.js 15 multivendor e-commerce platform that:
- Understands natural language queries like "Find red sneakers under $50 with 4+ stars"
- Integrates seamlessly with your existing Prisma + Elasticsearch stack
- Works with local LLMs (Ollama) or can be configured for OpenAI/Claude
- Shows results in a beautiful chat interface with product cards
- Maintains conversation context

## 📁 Files Created

### Backend
- **`/src/app/api/ai/query/route.ts`** - Main AI query processing API route

### Frontend
- **`/src/components/store/ai-shopping-assistant.tsx`** - Chat UI component
- **`/src/app/(store)/ai-assistant/page.tsx`** - Dedicated AI assistant page
- **`/src/hooks/use-ai-assistant.ts`** - Reusable React hook

## 🚀 Quick Start

### Option 1: Using Ollama (FREE - Recommended)

1. **Install Ollama:**
   ```bash
   # macOS
   curl -fsSL https://ollama.com/install.sh | sh
   
   # Or download from https://ollama.com
   ```

2. **Pull a model:**
   ```bash
   ollama pull llama3.2
   # or
   ollama pull mistral
   ollama pull phi3
   ```

3. **Start Ollama server:**
   ```bash
   ollama serve
   ```
   This runs on `http://localhost:11434` by default.

4. **Test your setup:**
   ```bash
   curl http://localhost:11434/api/generate -d '{
     "model": "llama3.2",
     "prompt": "Hello",
     "stream": false
   }'
   ```

### Option 2: Using OpenAI API (Paid)

1. **Get an API key from:** https://platform.openai.com/api-keys

2. **Add to your `.env` file:**
   ```env
   OPENAI_API_KEY=sk-your-key-here
   ```

3. **Uncomment OpenAI code in `/src/app/api/ai/query/route.ts`:**
   Find lines 125-159 and uncomment them.

### Option 3: Rule-Based (No AI needed)

The system has a fallback rule-based parser that works without any AI! It extracts:
- Keywords from the query
- Price ranges
- Colors
- Ratings
- Brands

## 🔗 Integration Methods

### Method 1: Standalone Page (Already Done!)
Visit: `http://localhost:3000/ai-assistant`

### Method 2: Add to Navigation

Add this to your navigation component:
```tsx
<Link href="/ai-assistant" className="flex items-center gap-2">
  <Sparkles className="w-4 h-4" />
  AI Assistant
</Link>
```

### Method 3: Floating Chat Button

Add this anywhere in your layout:
```tsx
"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIShoppingAssistant from "@/components/store/ai-shopping-assistant";

export function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
      
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[450px] h-[600px] z-40 shadow-2xl rounded-lg overflow-hidden">
          <AIShoppingAssistant />
        </div>
      )}
    </>
  );
}
```

### Method 4: Embed in Homepage

```tsx
import AIShoppingAssistant from "@/components/store/ai-shopping-assistant";

export default function HomePage() {
  return (
    <div>
      {/* Your existing content */}
      
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Try Our AI Shopping Assistant
        </h2>
        <AIShoppingAssistant />
      </section>
    </div>
  );
}
```

### Method 5: Use the Hook Anywhere

```tsx
"use client";

import { useAIAssistant } from "@/hooks/use-ai-assistant";

export function MyComponent() {
  const { searchProducts, products, isLoading, message } = useAIAssistant();

  const handleSearch = async () => {
    await searchProducts("Find red sneakers under $50");
  };

  return (
    <div>
      <button onClick={handleSearch}>Search</button>
      {isLoading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## 🎯 How It Works

1. **User Input:** User types a natural language query
2. **AI Processing:** 
   - Tries Ollama (local) first
   - Falls back to OpenAI if configured
   - Uses rule-based extraction as final fallback
3. **Parameter Extraction:** Extracts search criteria (price, rating, colors, etc.)
4. **Elasticsearch Query:** Searches your product index
5. **Prisma Enrichment:** Gets full product details with variants, sizes, stores
6. **Response:** Returns AI message + product cards in chat UI

## 🔧 Customization

### Change the AI Model

In `/src/app/api/ai/query/route.ts`, line 108:
```typescript
model: 'llama3.2', // Change to 'mistral', 'phi3', 'llama2', etc.
```

### Adjust Search Logic

Modify the `searchProducts` function (line 178) to:
- Add more filters (brand, category, etc.)
- Change sorting preferences
- Adjust result count

### Customize UI

Edit `/src/components/store/ai-shopping-assistant.tsx`:
- Change colors in the gradient headers
- Modify product card layout
- Add more information to product cards
- Change chat bubble styles

## 📊 Supported Query Patterns

The AI assistant understands:
- **Price:** "under $50", "below $100", "max $75"
- **Rating:** "4+ stars", "5 star", "high rated"
- **Colors:** "red", "blue", "black", "white", etc.
- **Brands:** "from Nike", "Adidas products"
- **Categories:** "sneakers", "laptops", "dresses"
- **Combinations:** "red Nike sneakers under $50 with 4+ stars"

## 🐛 Troubleshooting

### Ollama Connection Error
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama
ollama serve
```

### No Products Found
- Check your Elasticsearch index has products
- Verify your database has products with ACTIVE stores
- Try broader queries first

### UI Not Showing
- Ensure Shadcn components are installed
- Check imports in the component file
- Verify Tailwind CSS is configured

## 📦 Dependencies Used

All dependencies are already in your project:
- `@prisma/client` - Database queries
- `@elastic/elasticsearch` - Product search
- `@clerk/nextjs` - Authentication (optional for assistant)
- `lucide-react` - Icons
- Shadcn/ui components - UI elements

## 🎨 Example Queries to Test

```
1. "Find red sneakers under $50 with 4+ stars"
2. "Show me affordable laptops from Dell"
3. "I need a blue dress for a wedding"
4. "Find wireless headphones with good ratings"
5. "Show me black leather jackets under $100"
6. "Get me running shoes with free shipping"
7. "Find high-rated electronics under $200"
8. "Show me women's clothing from popular stores"
```

## 🚢 Deployment Notes

When deploying:
1. If using Ollama, ensure it's accessible to your server
2. Set `OPENAI_API_KEY` environment variable if using OpenAI
3. Ensure Elasticsearch is accessible
4. The rule-based fallback works without any external services

## 🔐 Security Considerations

- API route validates all inputs
- No user data is sent to AI (only product queries)
- Conversation history is client-side only
- Rate limiting recommended for production

## 📈 Next Steps

Consider adding:
- **Voice input** using Web Speech API
- **Image search** - "Find products similar to this image"
- **Comparison mode** - "Compare iPhone vs Samsung"
- **Personalization** - Based on user's order history
- **Multi-language support**
- **Product recommendations** - "Users also searched for..."

## 💬 Support

The assistant is fully integrated and ready to use! Test it at:
`http://localhost:3000/ai-assistant`

Enjoy your AI Shopping Assistant! 🎉
