"use client";
import { motion } from "framer-motion";
import { Star, TrendingUp, Shield, Users } from "lucide-react";

export default function CustomerStats() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
      gradient: "from-cyan-500 to-blue-500",
      glow: "cyan",
    },
    {
      icon: Star,
      value: "4.8/5",
      label: "Average Rating",
      gradient: "from-yellow-500 to-orange-500",
      glow: "yellow",
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Customer Satisfaction",
      gradient: "from-green-500 to-emerald-500",
      glow: "green",
    },
    {
      icon: Shield,
      value: "100%",
      label: "Secure Transactions",
      gradient: "from-purple-500 to-pink-500",
      glow: "purple",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 to-cyber-dark py-16 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-20" />
      
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Trusted by Thousands
            </span>
          </h2>
          <p className="text-slate-400 text-lg">Join our community of satisfied shoppers</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 rounded-2xl`} />
              
              {/* Card */}
              <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 group-hover:scale-105">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
