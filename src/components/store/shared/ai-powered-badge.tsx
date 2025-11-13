"use client";
import { Sparkles, Zap, Brain } from "lucide-react";
import { motion } from "framer-motion";

interface AIPoweredBadgeProps {
  type: "recommended" | "trending" | "smart-pick";
  className?: string;
}

export default function AIPoweredBadge({ type, className = "" }: AIPoweredBadgeProps) {
  const badges = {
    recommended: {
      icon: Sparkles,
      text: "AI Recommended",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-500/20 to-blue-500/20",
    },
    trending: {
      icon: Zap,
      text: "Trending Now",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
    },
    "smart-pick": {
      icon: Brain,
      text: "Smart Pick",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
    },
  };

  const badge = badges[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`group relative ${className}`}
    >
      {/* Animated glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${badge.gradient} blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-full animate-pulse`} />
      
      {/* Badge content */}
      <div className={`relative flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${badge.bgGradient} backdrop-blur-sm border border-white/10 rounded-full shadow-lg`}>
        <badge.icon className={`w-3.5 h-3.5 bg-gradient-to-r ${badge.gradient} bg-clip-text text-transparent animate-pulse`} />
        <span className={`text-xs font-bold bg-gradient-to-r ${badge.gradient} bg-clip-text text-transparent`}>
          {badge.text}
        </span>
      </div>
    </motion.div>
  );
}
