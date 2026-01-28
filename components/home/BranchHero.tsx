"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";

// Branch-specific hero images
const branchImages: Record<string, string> = {
  "sydney-cbd": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80",
  "melbourne-central": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80",
  "brisbane-south": "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920&q=80",
  "perth-city": "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1920&q=80",
};

// Branch-specific taglines
const branchTaglines: Record<string, string> = {
  "sydney-cbd": "The heart of Sydney's coffee culture",
  "melbourne-central": "Where Melbourne's coffee journey begins",
  "brisbane-south": "Brisbane's finest artisan roasters",
  "perth-city": "Perth's premium coffee destination",
};

export function BranchHero() {
  const { selectedBranch } = useStore();

  if (!selectedBranch) return null;

  const heroImage = branchImages[selectedBranch.id] || 
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80";
  const tagline = branchTaglines[selectedBranch.id] || "Exceptional coffee, crafted with care";

  // Get the current offer for this branch
  const currentOffer = selectedBranch.offers?.[0];

  return (
    <section className="relative min-h-[85vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.img
          key={selectedBranch.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src={heroImage}
          alt={selectedBranch.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Branch Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <div className={`w-2 h-2 rounded-full ${selectedBranch.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <MapPin className="w-4 h-4 text-white/80" />
              <span className="text-white/90 text-sm">{selectedBranch.name}</span>
              <span className="text-white/50">•</span>
              <span className="text-white/70 text-sm">{selectedBranch.isOpen ? 'Open Now' : 'Closed'}</span>
            </motion.div>

            <h1 className="font-serif text-5xl md:text-6xl text-white mb-4 leading-tight drop-shadow-lg">
              {tagline}
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-lg leading-relaxed drop-shadow-md">
              {selectedBranch.area} • {selectedBranch.address}
            </p>

            {/* Hours */}
            <div className="flex items-center gap-2 text-white/70 mb-8">
              <Clock className="w-5 h-5" />
              <span>Today: {selectedBranch.hours.open} - {selectedBranch.hours.close}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <Button 
                  size="lg" 
                  className="bg-white text-stone-900 hover:bg-white/90 gap-2 text-base px-8"
                >
                  Shop Coffee
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/visit">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white bg-white/10 hover:bg-white/20 hover:text-white gap-2 text-base px-8"
                >
                  Visit Us
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right - Current Offer Card */}
          {currentOffer && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <Badge className="bg-amber-500 text-white">
                    {selectedBranch.name} Exclusive
                  </Badge>
                </div>

                <h3 className="font-serif text-3xl text-white mb-3">
                  {currentOffer.title}
                </h3>
                <p className="text-white/70 mb-6">
                  {currentOffer.description}
                </p>

                {currentOffer.discount && (
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold text-amber-400">
                      {currentOffer.discount}% OFF
                    </span>
                    <span className="text-white/50">on selected items</span>
                  </div>
                )}

                <p className="text-sm text-white/50 mb-4">
                  Valid until {new Date(currentOffer.validUntil).toLocaleDateString('en-AU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>

                <Link href="/shop">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
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
