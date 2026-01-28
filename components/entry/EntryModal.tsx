"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Truck, Store, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export function EntryModal() {
  const router = useRouter();
  const { showEntryModal, setShowEntryModal, setOrderType, selectedBranch } = useStore();

  // Don't show if branch is already selected
  if (selectedBranch) return null;

  const handleDelivery = () => {
    setOrderType("delivery");
    setShowEntryModal(false);
  };

  const handlePickup = () => {
    setOrderType("pickup");
    setShowEntryModal(false);
    router.push("/branches");
  };

  return (
    <AnimatePresence>
      {showEntryModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-background rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
              {/* Header with image */}
              <div className="relative h-48 bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
                  alt="Coffee"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-stone-900/70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="font-serif text-3xl md:text-4xl text-white drop-shadow-lg">Welcome</h2>
                    <p className="mt-2 text-stone-200 drop-shadow-md">How would you like your coffee?</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEntryModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Options */}
              <div className="p-6 space-y-4 bg-white">
                {/* Delivery Option */}
                <button
                  onClick={handleDelivery}
                  className="w-full group"
                >
                  <div className="flex items-center gap-4 p-5 rounded-xl border-2 border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all">
                    <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                      <Truck className="w-6 h-6 text-stone-700" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-lg text-stone-900">Delivery</h3>
                      <p className="text-sm text-stone-600">
                        Order via our delivery partners
                      </p>
                    </div>
                  </div>
                </button>

                {/* Pickup Option */}
                <button
                  onClick={handlePickup}
                  className="w-full group"
                >
                  <div className="flex items-center gap-4 p-5 rounded-xl border-2 border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all">
                    <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                      <Store className="w-6 h-6 text-stone-700" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-lg text-stone-900">Pick Up</h3>
                      <p className="text-sm text-stone-600">
                        Order ahead & collect in store
                      </p>
                    </div>
                  </div>
                </button>

                <p className="text-center text-xs text-stone-500 pt-2">
                  You can browse our products without selecting an option
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Delivery options component for when delivery is selected
export function DeliveryOptions() {
  const { setShowEntryModal, setOrderType } = useStore();

  const handleBack = () => {
    setOrderType(null);
    setShowEntryModal(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Delivery</h1>
          <p className="text-muted-foreground text-lg">
            We partner with trusted delivery services to bring our coffee to your door.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <a
            href="https://ubereats.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="flex items-center gap-4 p-6 rounded-xl border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all bg-background">
              <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center">
                <span className="text-white font-bold text-xl">UE</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-xl">Uber Eats</h3>
                <p className="text-muted-foreground">
                  Fast delivery, real-time tracking
                </p>
              </div>
              <Button>Order Now</Button>
            </div>
          </a>

          <a
            href="https://doordash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="flex items-center gap-4 p-6 rounded-xl border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all bg-background">
              <div className="w-16 h-16 rounded-xl bg-red-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">DD</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-xl">DoorDash</h3>
                <p className="text-muted-foreground">
                  Reliable delivery, DashPass savings
                </p>
              </div>
              <Button>Order Now</Button>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Button variant="ghost" onClick={handleBack}>
            ← Back to order options
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
