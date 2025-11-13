"use client";
import { Shield, Truck, RotateCcw, Headphones, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustBar() {
  const features = [
    {
      icon: Shield,
      text: "100% Secure Shopping",
      subtext: "SSL Encrypted",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Truck,
      text: "Free Shipping",
      subtext: "On orders over $50",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: RotateCcw,
      text: "30-Day Returns",
      subtext: "Money-back guarantee",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Headphones,
      text: "24/7 Support",
      subtext: "Always here to help",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Sparkles,
      text: "AI-Powered Shopping",
      subtext: "Smart recommendations",
      gradient: "from-yellow-500 to-amber-500",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-y border-slate-700/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-lg`} />
              
              {/* Content */}
              <div className="relative flex items-center gap-3 p-3 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-slate-600 transition-all duration-300">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {feature.text}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {feature.subtext}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
