# 🚀 AI Shopping Assistant - Quick Start Guide

## ⚡ Fastest Way to Get Started (3 Steps!)

### Step 1: Install Ollama (2 minutes)
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model
ollama pull llama3.2

# Start server
ollama serve
```

### Step 2: Add Floating Chat Button
Open: `src/app/(store)/layout.tsx`

Add one line:
```tsx
import FloatingAIChat from "@/components/store/floating-ai-chat";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      <Toaster position="top-center" />
      <FloatingAIChat />  {/* 👈 Add this! */}
    </div>
  );
}
```

### Step 3: Test It!
```bash
# Start your dev server
cd /Users/xworld/Desktop/PROGRAMMING/PROGRAMING/alx/multivendor_ecommerce
npm run dev

# Visit: http://localhost:3000/ai-assistant
# Or use the floating chat button on any page!
```

---

## 📝 Example Queries

Copy & paste these to test:

```
Find red sneakers under $50 with 4+ stars
Show me affordable laptops from Dell
I need a blue dress for a wedding
Find wireless headphones with good ratings
Show me black leather jackets under $100
```

---

## 🎯 Files Created

✅ `/src/app/api/ai/query/route.ts` - Backend API
✅ `/src/components/store/ai-shopping-assistant.tsx` - Chat UI
✅ `/src/components/store/floating-ai-chat.tsx` - Floating button
✅ `/src/app/(store)/ai-assistant/page.tsx` - Standalone page
✅ `/src/hooks/use-ai-assistant.ts` - React hook

---

## 🔧 Configuration Options

### Use OpenAI Instead (Optional)
```env
# Add to .env
OPENAI_API_KEY=sk-your-key-here
```
Then uncomment lines 125-159 in `/src/app/api/ai/query/route.ts`

### No AI? No Problem!
Rule-based fallback works automatically without any setup!

---

## 🎨 Customization

### Change Colors
In `ai-shopping-assistant.tsx`:
```tsx
// Line 112: Change gradient
from-blue-500 to-purple-600
// To your brand colors:
from-green-500 to-teal-600
```

### Change AI Model
In `api/ai/query/route.ts` line 108:
```typescript
model: 'llama3.2',  // Try: mistral, phi3, llama2
```

---

## 🐛 Quick Fixes

**Ollama not connecting?**
```bash
curl http://localhost:11434/api/tags
ollama serve
```

**No products showing?**
- Check Elasticsearch is running
- Verify database has products
- Try broader search terms

---

## 📍 Where to Access

- **Standalone Page:** `http://localhost:3000/ai-assistant`
- **Floating Chat:** Add to any page via layout
- **Custom Hook:** Use in any component

---

## ✨ Features

✅ Natural language queries
✅ Price filtering
✅ Rating filtering  
✅ Color search
✅ Brand filtering
✅ Real-time results
✅ Beautiful UI
✅ Mobile responsive
✅ Works offline (rule-based)

---

## 🎉 That's It!

You now have a fully functional AI Shopping Assistant integrated into your e-commerce platform!

**Questions?** Check `AI_ASSISTANT_IMPLEMENTATION.md` for detailed docs.

Happy coding! 🚀
