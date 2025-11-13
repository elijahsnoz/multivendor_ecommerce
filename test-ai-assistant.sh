#!/bin/bash

# AI Shopping Assistant - Debug Test Script

echo "=========================================="
echo "AI Shopping Assistant - Debug Test"
echo "=========================================="
echo ""

# Test 1: Check if Ollama is running
echo "Test 1: Checking Ollama connection..."
OLLAMA_TEST=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:11434/api/tags 2>/dev/null)

if [ "$OLLAMA_TEST" = "200" ]; then
    echo "✅ Ollama is running on localhost:11434"
    echo "   Models available:"
    curl -s http://localhost:11434/api/tags | python3 -m json.tool | grep "name" | head -5
else
    echo "⚠️  Ollama not detected (this is OK - rule-based fallback will work)"
fi

echo ""

# Test 2: Test the API endpoint directly
echo "Test 2: Testing API endpoint..."
echo "Sending test query: 'Find red sneakers'"

RESPONSE=$(curl -s -X POST http://localhost:3000/api/ai/query \
  -H "Content-Type: application/json" \
  -d '{"query":"Find red sneakers"}')

echo "API Response:"
echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"

echo ""
echo "=========================================="
echo "Troubleshooting Steps:"
echo "=========================================="
echo ""
echo "1. Make sure your dev server is running:"
echo "   npm run dev"
echo ""
echo "2. Check browser console (F12) for errors"
echo ""
echo "3. If you see 'Ollama not detected', either:"
echo "   a) Install Ollama: curl -fsSL https://ollama.com/install.sh | sh"
echo "   b) Or just use rule-based mode (works without AI)"
echo ""
echo "4. Check your Elasticsearch connection in .env:"
echo "   ELASTICSEARCH_CLOUD_ID=..."
echo "   ELASTICSEARCH_API_KEY=..."
echo ""
echo "5. View API logs in terminal where 'npm run dev' is running"
echo ""
echo "=========================================="
