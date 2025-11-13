"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  endTime: Date;
  label?: string;
}

export default function CountdownTimer({ endTime, label = "Deal ends in" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-slate-400">{label}</span>
      <div className="flex items-center gap-1">
        {[
          { value: timeLeft.hours, label: "H" },
          { value: timeLeft.minutes, label: "M" },
          { value: timeLeft.seconds, label: "S" },
        ].map((unit, index) => (
          <div key={index} className="flex items-center">
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 blur-sm opacity-50 rounded" />
              <div className="relative bg-slate-900 border border-cyan-500/30 rounded px-2 py-1 min-w-[32px] text-center">
                <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
            {index < 2 && (
              <span className="text-cyan-400 mx-0.5 text-xs">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
