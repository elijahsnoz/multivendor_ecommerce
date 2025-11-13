"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image?: string;
  url: string;
}

export default function SpaceCategories({ categories }: { categories: Category[] }) {
  // Take first 8 categories
  const displayCategories = categories.slice(0, 8);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          <Star className="w-8 h-8 text-yellow-400" />
          Explore by Galaxy
        </h2>
        <Link 
          href="/browse" 
          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold transition-colors"
        >
          View All
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {displayCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={`/browse?category=${category.url}`}
              className="group block"
            >
              <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category image or placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Category name */}
              <p className="mt-2 text-center text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {category.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
