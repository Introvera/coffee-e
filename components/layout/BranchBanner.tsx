"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Gift, ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

// Pages with full-bleed heroes where we don't show the banner
const heroPages = ["/", "/about", "/subscriptions"];

export function BranchBanner() {
  const { selectedBranch, orderType } = useStore();
  const pathname = usePathname();

  // Don't show if no branch selected, delivery mode, or on hero pages
  const isHeroPage = heroPages.includes(pathname);
  if (!selectedBranch || orderType === "delivery" || isHeroPage) return null;

  const currentOffer = selectedBranch.offers[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-[56px] md:top-[64px] left-0 right-0 z-40 bg-stone-900 text-white shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2.5 gap-4">
          {/* Branch info */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-medium truncate">
                Pickup from <span className="text-amber-400">{selectedBranch.name}</span>
              </span>
            </div>
            
            {/* Status badge */}
            <div className={cn(
              "hidden sm:flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full",
              selectedBranch.isOpen 
                ? "bg-green-500/20 text-green-400" 
                : "bg-red-500/20 text-red-400"
            )}>
              <span className={cn(
                "w-1.5 h-1.5 rounded-full animate-pulse",
                selectedBranch.isOpen ? "bg-green-400" : "bg-red-400"
              )} />
              {selectedBranch.isOpen ? "Open" : "Closed"}
            </div>

            {/* Hours */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-400">
              <Clock className="w-3.5 h-3.5" />
              {selectedBranch.hours.open} - {selectedBranch.hours.close}
            </div>
          </div>

          {/* Offer teaser */}
          {currentOffer && (
            <div className="hidden lg:flex items-center gap-2 text-sm bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">
              <Gift className="w-4 h-4" />
              <span className="truncate max-w-[200px]">{currentOffer.title}</span>
              {currentOffer.code && (
                <code className="bg-amber-500/30 px-1.5 py-0.5 rounded text-xs font-mono">
                  {currentOffer.code}
                </code>
              )}
            </div>
          )}

          {/* Change branch link */}
          <Link
            href="/branches"
            className="flex items-center gap-1 text-sm text-stone-400 hover:text-white transition-colors flex-shrink-0"
          >
            Change
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
