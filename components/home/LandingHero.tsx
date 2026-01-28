"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Truck, Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export function LandingHero() {
  const router = useRouter();
  const { setOrderType } = useStore();

  const handleDelivery = () => {
    setOrderType("delivery");
    // Stay on home page but show delivery options
  };

  const handlePickup = () => {
    setOrderType("pickup");
    router.push("/branches");
  };

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80"
          alt="Coffee shop atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-amber-400 text-sm tracking-widest uppercase mb-4"
          >
            Welcome to Coffissimo
          </motion.span>

          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-lg">
            Exceptional Coffee,
            <br />
            <span className="text-amber-200">Your Way</span>
          </h1>

          <p className="text-xl text-white/80 mb-12 max-w-xl leading-relaxed drop-shadow-md">
            From single-origin beans to perfectly crafted blends, experience coffee 
            the way it was meant to be. Available for delivery or pickup at any of 
            our locations.
          </p>

          {/* Order Type Selection */}
          <div className="space-y-6">
            <p className="text-white/60 text-sm uppercase tracking-wider">
              How would you like your coffee?
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDelivery}
                className="group flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium text-lg">Delivery</p>
                  <p className="text-white/60 text-sm">Via Uber Eats or DoorDash</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/50 ml-auto group-hover:text-white group-hover:translate-x-1 transition-all" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePickup}
                className="group flex items-center gap-4 bg-amber-600/90 backdrop-blur-sm rounded-2xl p-6 hover:bg-amber-600 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Store className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium text-lg">Pick Up</p>
                  <p className="text-white/80 text-sm">From our café locations</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/70 ml-auto group-hover:text-white group-hover:translate-x-1 transition-all" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
