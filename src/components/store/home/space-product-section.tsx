"use client";
import { motion } from "framer-motion";
import { ProductType } from "@/lib/types";
import ProductCard from "@/components/store/cards/product/product-card";
import { ChevronRight, TrendingUp, Zap, Clock } from "lucide-react";
import Link from "next/link";

interface SpaceProductSectionProps {
  title: string;
  products: ProductType[];
  icon?: "trending" | "deals" | "new";
  viewAllLink?: string;
}

export default function SpaceProductSection({ 
  title, 
  products, 
  icon = "trending",
  viewAllLink = "/browse" 
}: SpaceProductSectionProps) {
  const icons = {
    trending: TrendingUp,
    deals: Zap,
    new: Clock,
  };

  const Icon = icons[icon];
  
  // Show first 12 products
  const displayProducts = products.slice(0, 12);

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/30">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            {title}
          </h2>
        </div>
        <Link 
          href={viewAllLink}
          className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 rounded-lg transition-all duration-300"
        >
          <span className="text-cyan-400 font-semibold">View All</span>
          <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="relative">
        {/* Cosmic glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 rounded-2xl blur-2xl" />
        
        <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
