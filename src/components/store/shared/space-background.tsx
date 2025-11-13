"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SpaceBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Deep space background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#000033] via-[#000428] to-[#000000]" />
      
      {/* Animated stars layer 1 */}
      <div className="fixed inset-0 opacity-60">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`star1-${i}`}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Animated stars layer 2 (slower) */}
      <div className="fixed inset-0 opacity-40">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star2-${i}`}
            className="absolute w-[1px] h-[1px] bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Nebula effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Shooting stars */}
      <div className="fixed inset-0 opacity-40 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-[100px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              left: '-100px',
              top: `${20 + i * 30}%`,
            }}
            animate={{
              x: ['0vw', '120vw'],
              y: ['0vh', '30vh'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 8,
              repeatDelay: 20,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
