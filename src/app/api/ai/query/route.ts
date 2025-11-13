import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import client from "@/lib/elasticsearch";

// Type definitions
interface AIQueryRequest {
  query: string;
  conversationHistory?: Array<{ role: string; content: string }>;
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

// Function to extract search parameters from AI response
function extractSearchParams(aiResponse: string): {
  keywords: string[];
  maxPrice?: number;
  minRating?: number;
  category?: string;
  brand?: string;
  colors?: string[];
} {
  const params: any = {
    keywords: [],
  };

  // Extract price
  const priceMatch = aiResponse.match(/(?:under|below|max|maximum).*?\$?(\d+)/i);
  if (priceMatch) {
    params.maxPrice = parseInt(priceMatch[1]);
  }

  // Extract rating
  const ratingMatch = aiResponse.match(/(\d+(?:\.\d+)?)\+?\s*(?:stars?|rating)/i);
  if (ratingMatch) {
    params.minRating = parseFloat(ratingMatch[1]);
  }

  // Extract colors
  const colorPattern = /(red|blue|green|black|white|yellow|orange|purple|pink|brown|gray|grey)/gi;
  const colors = aiResponse.match(colorPattern);
  if (colors) {
    params.colors = Array.from(new Set(colors.map(c => c.toLowerCase())));
  }

  // Extract brand
  const brandMatch = aiResponse.match(/(?:brand|from)\s+([A-Z][a-zA-Z]+)/);
  if (brandMatch) {
    params.brand = brandMatch[1];
  }

  // Extract general keywords
  const words = aiResponse.toLowerCase().split(/\s+/);
  const stopWords = ['find', 'show', 'me', 'get', 'with', 'under', 'over', 'the', 'a', 'an'];
  params.keywords = words.filter(w => 
    w.length > 2 && 
    !stopWords.includes(w) && 
    !w.match(/^\d+$/) &&
    !w.match(/^[$£€]/)
  );

  return params;
}

// Function to call local LLM (Ollama) or API-based LLM
async function callAI(userQuery: string, conversationHistory: Array<{ role: string; content: string }> = []) {
  const systemPrompt = `You are an AI shopping assistant for a multivendor e-commerce platform. 
Your role is to help users find products by understanding their natural language queries.

When a user asks for products:
1. Extract key information: product type, color, price range, brand, rating requirements
2. Provide a friendly, conversational response
3. Suggest relevant search parameters

Example queries:
- "Find red sneakers under $50 with 4+ stars"
- "Show me affordable laptops from Dell"
- "I need a blue dress for a wedding"

Respond in a helpful, concise manner and extract product search criteria.`;

  // OPTION 1: Use Ollama (Local LLM) - Recommended for free usage
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'llama3.2', // or 'mistral', 'phi3', etc.
        prompt: `${systemPrompt}\n\nUser: ${userQuery}\n\nAssistant:`,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 200,
        }
      }),
    });

    clearTimeout(timeoutId);

    if (ollamaResponse.ok) {
      const data = await ollamaResponse.json();
      return {
        response: data.response,
        source: 'ollama'
      };
    }
  } catch (ollamaError) {
    console.log('Ollama not available, using rule-based system');
  }

  // OPTION 2: Use OpenAI API (requires API key)
  // Uncomment and add OPENAI_API_KEY to .env if you want to use OpenAI
  /*
  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory,
          { role: 'user', content: userQuery }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (openaiResponse.ok) {
      const data = await openaiResponse.json();
      return {
        response: data.choices[0].message.content,
        source: 'openai'
      };
    }
  } catch (openaiError) {
    console.log('OpenAI API error:', openaiError);
  }
  */

  // FALLBACK: Rule-based response (no AI needed)
  const searchParams = extractSearchParams(userQuery);
  let response = "I found ";
  
  if (searchParams.colors && searchParams.colors.length > 0) {
    response += `${searchParams.colors.join(' and ')} `;
  }
  
  if (searchParams.keywords.length > 0) {
    const mainKeywords = searchParams.keywords.slice(0, 3).join(' ');
    response += `${mainKeywords} `;
  }
  
  const filters = [];
  if (searchParams.maxPrice) {
    filters.push(`under $${searchParams.maxPrice}`);
  }
  
  if (searchParams.minRating) {
    filters.push(`with ${searchParams.minRating}+ star ratings`);
  }
  
  if (searchParams.brand) {
    filters.push(`from ${searchParams.brand}`);
  }
  
  if (filters.length > 0) {
    response += filters.join(', ') + ' ';
  }
  
  response += "for you! Here are the best matches:";

  return {
    response: response,
    source: 'rule-based'
  };
}

// Function to search products using Elasticsearch and Prisma
async function searchProducts(params: {
  keywords: string[];
  maxPrice?: number;
  minRating?: number;
  category?: string;
  brand?: string;
  colors?: string[];
}): Promise<ProductResult[]> {
  try {
    // Build Elasticsearch query
    const mustClauses: any[] = [];
    const shouldClauses: any[] = [];

    // Keyword search (name, description, brand)
    if (params.keywords.length > 0) {
      params.keywords.forEach(keyword => {
        shouldClauses.push(
          { match: { name: { query: keyword, boost: 3 } } },
          { match: { description: { query: keyword, boost: 2 } } },
          { match: { brand: { query: keyword, boost: 2 } } }
        );
      });
    }

    // Color search in variant names
    if (params.colors && params.colors.length > 0) {
      params.colors.forEach(color => {
        shouldClauses.push({
          nested: {
            path: "variants",
            query: {
              match: { "variants.variantName": color }
            }
          }
        });
      });
    }

    // Brand filter
    if (params.brand) {
      mustClauses.push({ match: { brand: params.brand } });
    }

    // Rating filter
    if (params.minRating) {
      mustClauses.push({ range: { rating: { gte: params.minRating } } });
    }

    // Build the query
    const esQuery: any = {
      bool: {
        must: mustClauses.length > 0 ? mustClauses : undefined,
        should: shouldClauses.length > 0 ? shouldClauses : undefined,
        minimum_should_match: shouldClauses.length > 0 ? 1 : 0,
      }
    };

    // Execute Elasticsearch search
    const esResponse = await client.search({
      index: 'products',
      body: {
        query: esQuery,
        size: 20,
        sort: [
          { rating: { order: 'desc' } },
          { sales: { order: 'desc' } }
        ]
      }
    });

    const productIds = esResponse.hits.hits.map((hit: any) => hit._id);

    if (productIds.length === 0) {
      return [];
    }

    // Fetch full product details from Prisma
    const products = await db.product.findMany({
      where: {
        id: { in: productIds },
        store: { status: 'ACTIVE' }
      },
      include: {
        category: { select: { name: true } },
        subCategory: { select: { name: true } },
        store: {
          select: {
            name: true,
            url: true,
            logo: true,
          }
        },
        variants: {
          take: 1, // Get first variant for preview
          include: {
            sizes: {
              where: { quantity: { gt: 0 } },
              orderBy: { price: 'asc' },
              take: 3
            }
          }
        }
      },
      take: 12
    });

    // Filter by price if specified
    let filteredProducts = products;
    if (params.maxPrice) {
      filteredProducts = products.filter(product => {
        const minPrice = Math.min(
          ...product.variants.flatMap(v => v.sizes.map(s => s.price - (s.price * s.discount / 100)))
        );
        return minPrice <= params.maxPrice!;
      });
    }

    return filteredProducts as unknown as ProductResult[];
  } catch (error) {
    console.error('Product search error:', error);
    return [];
  }
}

// Main API route handler
export async function POST(req: Request) {
  try {
    const body: AIQueryRequest = await req.json();
    const { query, conversationHistory = [] } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid query parameter' },
        { status: 400 }
      );
    }

    console.log('Processing query:', query);

    // Get AI response
    const aiResult = await callAI(query, conversationHistory);
    console.log('AI Result:', aiResult);

    // Extract search parameters from query
    const searchParams = extractSearchParams(query);
    console.log('Search params:', searchParams);

    // Search for products
    const products = await searchProducts(searchParams);
    console.log('Found products:', products.length);

    // Return response
    return NextResponse.json({
      message: aiResult.response,
      products: products,
      searchParams: searchParams,
      aiSource: aiResult.source,
      totalResults: products.length
    });

  } catch (error: any) {
    console.error('AI query error:', error);
    return NextResponse.json(
      { error: 'Failed to process query', details: error.message },
      { status: 500 }
    );
  }
}
