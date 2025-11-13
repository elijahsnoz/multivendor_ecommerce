"use client";
import { motion } from "framer-motion";
import { SimpleProduct } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

export default function SpaceFeaturedDeals({ products }: { products: SimpleProduct[] }) {
  // Get first 4 featured products
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg shadow-orange-500/30 animate-pulse">
          <Flame className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">
          Today&apos;s{" "}
          <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Hot Deals
          </span>
        </h2>
      </div>

      {/* Featured Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={`${product.slug}-${product.variantSlug}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/product/${product.slug}/${product.variantSlug}`}
              className="group block relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
            >
              {/* Deal Badge */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-lg">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  HOT DEAL
                </span>
              </div>

              {/* Product Image */}
              <div className="absolute inset-0">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Product Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-cyan-300 mb-2">{product.variantName}</p>
                
                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-cyan-400">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-3 transition-all">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
