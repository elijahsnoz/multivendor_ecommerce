"use client";
import { Shield, Lock, CheckCircle2, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityBadges() {
  const badges = [
    {
      icon: Shield,
      text: "256-bit SSL Encrypted",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Lock,
      text: "Secure Checkout",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: CheckCircle2,
      text: "PCI Compliant",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: CreditCard,
      text: "Protected Payments",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-lg" />
          <div className="relative flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-slate-600 transition-all duration-300">
            <badge.icon className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-slate-300">
              {badge.text}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
