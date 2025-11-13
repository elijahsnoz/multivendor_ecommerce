"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, MapPin } from "lucide-react";
import Image from "next/image";

interface Purchase {
  name: string;
  location: string;
  product: string;
  time: string;
}

export default function LivePurchaseNotification() {
  const [currentPurchase, setCurrentPurchase] = useState<Purchase | null>(null);
  const [show, setShow] = useState(false);

  // Simulated purchase data
  const purchases: Purchase[] = [
    { name: "Sarah M.", location: "New York, US", product: "Wireless Headphones", time: "2 minutes ago" },
    { name: "David K.", location: "London, UK", product: "Smart Watch Pro", time: "5 minutes ago" },
    { name: "Emma L.", location: "Tokyo, JP", product: "Gaming Keyboard", time: "8 minutes ago" },
    { name: "Michael R.", location: "Sydney, AU", product: "4K Webcam", time: "12 minutes ago" },
    { name: "Olivia P.", location: "Toronto, CA", product: "Portable Charger", time: "15 minutes ago" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPurchase = purchases[Math.floor(Math.random() * purchases.length)];
      setCurrentPurchase(randomPurchase);
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && currentPurchase && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100, y: 0 }}
          className="fixed bottom-20 left-4 z-50 max-w-sm"
        >
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-30 blur-xl rounded-lg" />
            
            {/* Content */}
            <div className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-lg p-4 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white mb-1">
                    {currentPurchase.name} just purchased
                  </p>
                  <p className="text-sm text-cyan-400 mb-2">
                    {currentPurchase.product}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span>{currentPurchase.location}</span>
                    <span>•</span>
                    <span>{currentPurchase.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
