"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PaymentLogos({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const logos = [
    { name: "Visa", width: 50 },
    { name: "Mastercard", width: 50 },
    { name: "PayPal", width: 70 },
    { name: "Stripe", width: 60 },
    { name: "Apple Pay", width: 50 },
    { name: "Google Pay", width: 60 },
  ];

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="flex items-center gap-2">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-slate-700" />
        <span className={`text-sm font-medium ${variant === "dark" ? "text-slate-400" : "text-slate-600"}`}>
          We Accept
        </span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-slate-700" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {logos.map((logo, index) => (
          <motion.div
            key={logo.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            <div className={`relative px-4 py-2 rounded-lg ${
              variant === "dark" 
                ? "bg-slate-800/50 border border-slate-700/50" 
                : "bg-white border border-slate-200"
            } backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300`}>
              <div className={`font-bold text-sm ${
                variant === "dark" ? "text-slate-300" : "text-slate-700"
              }`} style={{ width: logo.width }}>
                {logo.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
