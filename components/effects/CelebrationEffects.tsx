"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Australian and common celebration days
const celebrations = [
  {
    name: "New Year",
    month: 1,
    day: 1,
    emoji: "🎉",
    colors: ["#FFD700", "#FFA500"],
    message: "Happy New Year!",
  },
  {
    name: "Australia Day",
    month: 1,
    day: 26,
    emoji: "🇦🇺",
    colors: ["#00008B", "#FFD700"],
    message: "Happy Australia Day!",
  },
  {
    name: "Valentine's Day",
    month: 2,
    day: 14,
    emoji: "❤️",
    colors: ["#FF69B4", "#FF1493"],
    message: "Happy Valentine's Day!",
  },
  {
    name: "Easter",
    month: 4,
    day: 20, // Approximate - Easter moves
    emoji: "🐰",
    colors: ["#FFB6C1", "#DDA0DD"],
    message: "Happy Easter!",
  },
  {
    name: "ANZAC Day",
    month: 4,
    day: 25,
    emoji: "🌺",
    colors: ["#8B0000", "#228B22"],
    message: "Lest We Forget",
  },
  {
    name: "Mother's Day",
    month: 5,
    day: 12, // Second Sunday of May (approximate)
    emoji: "💐",
    colors: ["#FF69B4", "#FFB6C1"],
    message: "Happy Mother's Day!",
  },
  {
    name: "Father's Day",
    month: 9,
    day: 1, // First Sunday of September in Australia
    emoji: "👔",
    colors: ["#4169E1", "#1E90FF"],
    message: "Happy Father's Day!",
  },
  {
    name: "Halloween",
    month: 10,
    day: 31,
    emoji: "🎃",
    colors: ["#FF6600", "#800080"],
    message: "Happy Halloween!",
  },
  {
    name: "Christmas",
    month: 12,
    day: 25,
    emoji: "🎄",
    colors: ["#FF0000", "#228B22"],
    message: "Merry Christmas!",
  },
  {
    name: "Boxing Day",
    month: 12,
    day: 26,
    emoji: "🎁",
    colors: ["#FF0000", "#FFD700"],
    message: "Happy Boxing Day!",
  },
];

interface Particle {
  id: number;
  x: number;
  emoji: string;
  delay: number;
  duration: number;
}

export function CelebrationEffects() {
  const [celebration, setCelebration] = useState<typeof celebrations[0] | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // Check if today matches any celebration (with a 1-day buffer)
    const todayCelebration = celebrations.find(
      (c) =>
        c.month === currentMonth &&
        (c.day === currentDay || c.day === currentDay - 1 || c.day === currentDay + 1)
    );

    if (todayCelebration) {
      setCelebration(todayCelebration);

      // Generate particles
      const newParticles: Particle[] = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          emoji: todayCelebration.emoji,
          delay: Math.random() * 5,
          duration: 8 + Math.random() * 6,
        });
      }
      setParticles(newParticles);

      // Auto-hide banner after 8 seconds
      const timer = setTimeout(() => setShowBanner(false), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!celebration) return null;

  return (
    <>
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ y: -50, x: `${particle.x}vw`, opacity: 0 }}
            animate={{
              y: "110vh",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute text-2xl md:text-3xl"
            style={{ left: `${particle.x}%` }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </div>

      {/* Celebration banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[101] px-6 py-3 rounded-full shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${celebration.colors[0]}, ${celebration.colors[1]})`,
            }}
          >
            <div className="flex items-center gap-3 text-white">
              <span className="text-2xl">{celebration.emoji}</span>
              <span className="font-medium text-sm md:text-base whitespace-nowrap">
                {celebration.message}
              </span>
              <button
                onClick={() => setShowBanner(false)}
                className="ml-2 text-white/80 hover:text-white text-lg"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
