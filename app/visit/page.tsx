"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { branches } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function VisitPage() {
  const openBranches = branches.filter((b) => b.isOpen);
  const closedBranches = branches.filter((b) => !b.isOpen);
  const { selectedBranch } = useStore();
  const hasBranchBanner = !!selectedBranch;

  return (
    <div className={cn(
      "min-h-screen pb-16 page-transition",
      hasBranchBanner ? "pt-32 md:pt-36" : "pt-24"
    )}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Visit Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Step into one of our London locations and experience the art of
            exceptional coffee. Each café offers a unique atmosphere while
            serving the same carefully crafted drinks.
          </p>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-stone-800">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80"
              alt="London map"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/80 via-stone-900/50 to-stone-900/60">
              <div className="text-center">
                <Navigation className="w-12 h-12 mx-auto mb-4 text-white drop-shadow-lg" />
                <h3 className="font-serif text-2xl md:text-3xl mb-2 text-white drop-shadow-lg">
                  {branches.length} Locations Across London
                </h3>
                <p className="text-stone-200 drop-shadow-md">
                  {openBranches.length} currently open
                </p>
              </div>
            </div>
            {/* Location markers */}
            {branches.map((branch, index) => (
              <div
                key={branch.id}
                className={cn(
                  "absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2",
                  branch.isOpen ? "bg-green-500" : "bg-red-500"
                )}
                style={{
                  left: `${20 + index * 20}%`,
                  top: `${40 + (index % 2) * 20}%`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Branch List */}
        <div className="space-y-16">
          {/* Open Branches */}
          {openBranches.length > 0 && (
            <section>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-3xl mb-8"
              >
                Open Now
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8">
                {openBranches.map((branch, index) => (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                      <img
                        src={branch.image}
                        alt={branch.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <Badge className="absolute top-4 right-4 bg-green-500 text-white hover:bg-green-500">
                        Open Now
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-2xl">{branch.name}</h3>
                          <p className="text-muted-foreground">{branch.area}</p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link href="/branches">Order Pickup</Link>
                        </Button>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {branch.hours.days}: {branch.hours.open} -{" "}
                          {branch.hours.close}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a
                          href={`tel:${branch.phone}`}
                          className="hover:underline"
                        >
                          {branch.phone}
                        </a>
                      </div>

                      {/* Current Offer */}
                      {branch.offers.length > 0 && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                            Current Offer
                          </p>
                          <p className="font-medium">{branch.offers[0].title}</p>
                          <p className="text-sm text-muted-foreground">
                            {branch.offers[0].description}
                          </p>
                          {branch.offers[0].code && (
                            <Badge variant="outline" className="mt-2">
                              Code: {branch.offers[0].code}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Closed Branches */}
          {closedBranches.length > 0 && (
            <section>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-3xl mb-8"
              >
                Currently Closed
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8">
                {closedBranches.map((branch, index) => (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="opacity-75"
                  >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 grayscale">
                      <img
                        src={branch.image}
                        alt={branch.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-red-500 text-white hover:bg-red-500">
                        Closed
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-serif text-2xl">{branch.name}</h3>
                        <p className="text-muted-foreground">{branch.area}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>
                          Opens {branch.hours.days}: {branch.hours.open}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h2 className="font-serif text-3xl mb-4">Can't visit in person?</h2>
          <p className="text-muted-foreground mb-6">
            Order online for pickup or have your favorite coffee delivered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/branches">Order for Pickup</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/shop">Shop Online</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
