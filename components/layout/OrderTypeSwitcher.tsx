"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Store, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function OrderTypeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { orderType, selectedBranch, setOrderType, setSelectedBranch, clearCart } = useStore();

  const handleSelectDelivery = () => {
    setOrderType("delivery");
    setSelectedBranch(null);
    clearCart();
    setIsOpen(false);
  };

  const handleSelectPickup = () => {
    setOrderType("pickup");
    setIsOpen(false);
    router.push("/branches");
  };

  const handleChangeBranch = () => {
    setIsOpen(false);
    router.push("/branches");
  };

  const handleStartOver = () => {
    setOrderType(null);
    setSelectedBranch(null);
    clearCart();
    setIsOpen(false);
    router.push("/");
  };

  // Don't show if no order type selected yet
  if (!orderType) return null;

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 border-stone-300 hover:bg-stone-100"
      >
        {orderType === "delivery" ? (
          <>
            <Truck className="w-4 h-4" />
            <span className="hidden sm:inline">Delivery</span>
          </>
        ) : (
          <>
            <Store className="w-4 h-4" />
            <span className="hidden sm:inline">
              {selectedBranch?.name || "Pick Up"}
            </span>
          </>
        )}
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-stone-200 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-stone-100">
                <p className="text-sm font-medium text-stone-900">Order Type</p>
                <p className="text-xs text-stone-500 mt-1">
                  {orderType === "delivery"
                    ? "Delivery via our partners"
                    : selectedBranch
                    ? `Picking up from ${selectedBranch.name}`
                    : "Select a branch for pickup"}
                </p>
              </div>

              <div className="p-2">
                {/* Delivery Option */}
                <button
                  onClick={handleSelectDelivery}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left",
                    orderType === "delivery"
                      ? "bg-stone-100"
                      : "hover:bg-stone-50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    orderType === "delivery" ? "bg-stone-900 text-white" : "bg-stone-100"
                  )}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-stone-900">Delivery</p>
                    <p className="text-xs text-stone-500">Via Uber Eats or DoorDash</p>
                  </div>
                  {orderType === "delivery" && (
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  )}
                </button>

                {/* Pickup Option */}
                <button
                  onClick={handleSelectPickup}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left",
                    orderType === "pickup"
                      ? "bg-stone-100"
                      : "hover:bg-stone-50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    orderType === "pickup" ? "bg-stone-900 text-white" : "bg-stone-100"
                  )}>
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-stone-900">Pick Up</p>
                    <p className="text-xs text-stone-500">
                      {selectedBranch ? selectedBranch.name : "Select a branch"}
                    </p>
                  </div>
                  {orderType === "pickup" && (
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  )}
                </button>

                {/* Change Branch (only if pickup selected) */}
                {orderType === "pickup" && selectedBranch && (
                  <button
                    onClick={handleChangeBranch}
                    className="w-full mt-2 p-3 text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                  >
                    Change pickup location
                  </button>
                )}
              </div>

              {/* Start Over */}
              <div className="p-2 border-t border-stone-100">
                <button
                  onClick={handleStartOver}
                  className="w-full flex items-center justify-center gap-2 p-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Start over
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
