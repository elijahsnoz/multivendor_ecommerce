"use client";
import { motion } from "framer-motion";
import { Package, AlertCircle } from "lucide-react";

interface StockIndicatorProps {
  stock: number;
  threshold?: number;
}

export default function StockIndicator({ stock, threshold = 10 }: StockIndicatorProps) {
  const isLowStock = stock <= threshold && stock > 0;
  const isOutOfStock = stock === 0;

  if (!isLowStock && !isOutOfStock) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {isOutOfStock ? (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-950/50 border border-red-500/30 rounded-lg backdrop-blur-sm">
          <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />
          <span className="text-sm font-semibold text-red-400">Out of Stock</span>
        </div>
      ) : (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-30 blur-md rounded-lg" />
          <div className="relative flex items-center gap-2 px-3 py-2 bg-orange-950/50 border border-orange-500/30 rounded-lg backdrop-blur-sm">
            <Package className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="text-sm font-semibold text-orange-400">
              Only {stock} left in stock!
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
