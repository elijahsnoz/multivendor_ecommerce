#!/bin/bash

# NexaShop Transformation - Installation Script
# This script installs the required dependency and verifies the setup

echo "🚀 NexaShop Transformation - Installation"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo "✅ Found package.json"
echo ""

# Install framer-motion
echo "📦 Installing framer-motion..."
npm install framer-motion

if [ $? -eq 0 ]; then
    echo "✅ framer-motion installed successfully!"
else
    echo "❌ Failed to install framer-motion"
    exit 1
fi

echo ""
echo "🎨 Checking new components..."

# Check if new components exist
COMPONENTS=(
    "src/components/store/shared/security-badges.tsx"
    "src/components/store/shared/payment-logos.tsx"
    "src/components/store/shared/trust-bar.tsx"
    "src/components/store/shared/live-purchase-notification.tsx"
    "src/components/store/shared/customer-stats.tsx"
    "src/components/store/shared/ai-powered-badge.tsx"
    "src/components/store/shared/countdown-timer.tsx"
    "src/components/store/shared/stock-indicator.tsx"
)

MISSING=0
for component in "${COMPONENTS[@]}"; do
    if [ -f "$component" ]; then
        echo "✅ $component"
    else
        echo "❌ Missing: $component"
        MISSING=$((MISSING + 1))
    fi
done

echo ""

if [ $MISSING -eq 0 ]; then
    echo "✅ All components are in place!"
else
    echo "⚠️  Warning: $MISSING component(s) missing"
fi

echo ""
echo "📄 Checking updated pages..."

# Check updated files
PAGES=(
    "src/app/(store)/page.tsx"
    "src/app/(store)/checkout/page.tsx"
    "src/app/(store)/about/page.tsx"
    "src/components/store/layout/header/header.tsx"
    "src/components/store/layout/footer/footer.tsx"
    "src/components/store/cards/product/product-card.tsx"
    "tailwind.config.ts"
)

for page in "${PAGES[@]}"; do
    if [ -f "$page" ]; then
        echo "✅ $page"
    else
        echo "❌ Missing: $page"
    fi
done

echo ""
echo "📚 Checking documentation..."

DOCS=(
    "NEXASHOP_TRANSFORMATION.md"
    "QUICK_START.md"
    "TRANSFORMATION_COMPLETE.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo "✅ $doc"
    else
        echo "⚠️  Missing: $doc"
    fi
done

echo ""
echo "=========================================="
echo "🎉 Installation Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Visit http://localhost:3000 to see the changes"
echo "3. Check the About page at http://localhost:3000/about"
echo "4. Review TRANSFORMATION_COMPLETE.md for full details"
echo ""
echo "Key Pages to Test:"
echo "  • Homepage - Trust bar, live notifications"
echo "  • Checkout - Security header, progress bar"
echo "  • About - Company information"
echo "  • Products - AI badges, stock indicators"
echo ""
echo "Happy selling with NexaShop! 🛍️✨"
