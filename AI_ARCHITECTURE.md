# 🏗️ AI Shopping Assistant - Architecture Overview

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  ┌────────────────────┐         ┌───────────────────────────┐  │
│  │  Chat Component    │         │  Floating Chat Button     │  │
│  │  (Full Page)       │   OR    │  (Any Page)               │  │
│  └────────┬───────────┘         └────────────┬──────────────┘  │
│           │                                   │                  │
│           └─────────────┬─────────────────────┘                  │
└───────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND LOGIC                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  useAIAssistant Hook                                     │  │
│  │  - Manages conversation state                            │  │
│  │  - Handles API calls                                     │  │
│  │  - Loading & error states                                │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘
                          │
                          ▼ HTTP POST
┌─────────────────────────────────────────────────────────────────┐
│                    API ROUTE                                    │
│  /api/ai/query                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  1. Receive user query                                   │  │
│  │  2. Call AI processing                                   │  │
│  │  3. Extract search parameters                            │  │
│  │  4. Search products                                      │  │
│  │  5. Return formatted response                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘
           │                    │                      │
           ▼                    ▼                      ▼
┌─────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   AI SERVICE    │  │   ELASTICSEARCH   │  │   PRISMA ORM     │
│                 │  │                   │  │                   │
│ ┌─────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │
│ │  Ollama     │ │  │ │ Search Index │ │  │ │   Database   │ │
│ │  (Local)    │ │  │ │ - Products   │ │  │ │ - Products   │ │
│ └─────────────┘ │  │ │ - Variants   │ │  │ │ - Stores     │ │
│       OR        │  │ │ - Keywords   │ │  │ │ - Variants   │ │
│ ┌─────────────┐ │  │ └──────────────┘ │  │ │ - Sizes      │ │
│ │  OpenAI     │ │  │                   │  │ └──────────────┘ │
│ │  API        │ │  └──────────────────┘  └──────────────────┘
│ └─────────────┘ │
│       OR        │
│ ┌─────────────┐ │
│ │ Rule-Based  │ │
│ │ Parser      │ │
│ └─────────────┘ │
└─────────────────┘
```

## Data Flow

### 1. User Query Processing

```
User Input: "Find red sneakers under $50 with 4+ stars"
           ↓
AI Processing (Ollama/OpenAI/Rules)
           ↓
Understanding: {
  intent: "product_search",
  product_type: "sneakers",
  color: "red",
  max_price: 50,
  min_rating: 4
}
```

### 2. Parameter Extraction

```javascript
{
  keywords: ["red", "sneakers"],
  maxPrice: 50,
  minRating: 4,
  colors: ["red"],
  category: null,
  brand: null
}
```

### 3. Elasticsearch Query

```json
{
  "bool": {
    "must": [
      { "range": { "rating": { "gte": 4 } } }
    ],
    "should": [
      { "match": { "name": { "query": "sneakers", "boost": 3 } } },
      { "match": { "description": { "query": "red" } } },
      { "nested": { 
          "path": "variants",
          "query": { "match": { "variants.variantName": "red" } }
        }
      }
    ]
  }
}
```

### 4. Prisma Enrichment

```typescript
const products = await db.product.findMany({
  where: { id: { in: elasticsearchResults } },
  include: {
    variants: {
      include: { sizes: true }
    },
    store: true,
    category: true
  }
})
```

### 5. Price Filtering

```typescript
filteredProducts = products.filter(product => {
  const minPrice = Math.min(
    ...product.variants.flatMap(v => 
      v.sizes.map(s => s.price - (s.price * s.discount / 100))
    )
  );
  return minPrice <= maxPrice;
});
```

### 6. Response Format

```json
{
  "message": "I found 8 red sneakers under $50 with 4+ star ratings!",
  "products": [
    {
      "id": "uuid",
      "name": "Nike Air Max Red",
      "rating": 4.5,
      "variants": [...],
      "store": {...}
    }
  ],
  "searchParams": {...},
  "aiSource": "ollama",
  "totalResults": 8
}
```

## Component Hierarchy

```
┌─ AIShoppingAssistant (Main Component)
│  ├─ Header (Gradient with Sparkles icon)
│  ├─ ScrollArea (Message container)
│  │  ├─ Message[]
│  │  │  ├─ User Message
│  │  │  │  └─ Text + Avatar
│  │  │  └─ Assistant Message
│  │  │     ├─ Text + Avatar
│  │  │     └─ ProductResults (optional)
│  │  │        └─ ProductCard[]
│  │  │           ├─ Image
│  │  │           ├─ Name + Brand
│  │  │           ├─ Rating Stars
│  │  │           ├─ Price + Discount
│  │  │           └─ Store Badge
│  │  └─ LoadingIndicator (when searching)
│  └─ Footer
│     ├─ Input (query text)
│     └─ Send Button
```

## State Management

```typescript
// Component State
const [messages, setMessages] = useState<Message[]>([])
const [input, setInput] = useState("")
const [isLoading, setIsLoading] = useState(false)

// Message Structure
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  products?: ProductResult[]
  timestamp: Date
}
```

## API Integration Points

### 1. AI Services
```
┌─────────────────────────────────────┐
│ Priority 1: Ollama (localhost:11434)│
│ Priority 2: OpenAI API              │
│ Priority 3: Rule-Based Fallback     │
└─────────────────────────────────────┘
```

### 2. Search Services
```
┌────────────────────────────────┐
│ Step 1: Elasticsearch Query    │
│         (Fast initial search)   │
├────────────────────────────────┤
│ Step 2: Prisma Enrichment      │
│         (Full product details)  │
├────────────────────────────────┤
│ Step 3: Client-side Filtering  │
│         (Price, availability)   │
└────────────────────────────────┘
```

## Security & Performance

### Rate Limiting
- Consider implementing rate limits on `/api/ai/query`
- Prevent abuse of AI services

### Caching
```typescript
// Potential optimization
const cachedResults = await redis.get(`query:${hash(userQuery)}`)
if (cachedResults) return cachedResults
```

### Error Handling
```typescript
try {
  // AI call
} catch (ollamaError) {
  try {
    // OpenAI fallback
  } catch (openaiError) {
    // Rule-based fallback (always works)
  }
}
```

## Scalability Considerations

### Current Design (Good for 10k-100k products)
- Elasticsearch handles search efficiently
- Prisma provides detailed product data
- Client-side rendering of results

### Future Optimization (100k+ products)
1. **Implement pagination** for large result sets
2. **Add Redis caching** for frequent queries
3. **Use CDN** for product images
4. **Consider serverless functions** for AI processing
5. **Add request queuing** for high traffic

## Deployment Architecture

```
┌─────────────────────────────────────────────┐
│            Production Setup                 │
├─────────────────────────────────────────────┤
│ Frontend (Vercel/Netlify)                   │
│  └─ Next.js App with AI Component           │
├─────────────────────────────────────────────┤
│ API Routes (Serverless Functions)           │
│  └─ /api/ai/query                           │
├─────────────────────────────────────────────┤
│ AI Service                                  │
│  ├─ Option A: Ollama on VPS                 │
│  ├─ Option B: OpenAI API                    │
│  └─ Option C: Rule-based (no external)      │
├─────────────────────────────────────────────┤
│ Elasticsearch (Elastic Cloud / Self-hosted) │
├─────────────────────────────────────────────┤
│ Database (MySQL - PlanetScale / AWS RDS)    │
└─────────────────────────────────────────────┘
```

## Monitoring & Analytics

Track these metrics:
- Query response time
- AI service availability
- Search result relevance
- User engagement (clicks, conversions)
- Most common query patterns

## Summary

This architecture provides:
✅ **Flexibility** - Multiple AI backends
✅ **Reliability** - Fallback mechanisms
✅ **Performance** - Elasticsearch + Prisma combo
✅ **Scalability** - Modular design
✅ **User Experience** - Beautiful chat interface
✅ **Maintainability** - Clean separation of concerns
