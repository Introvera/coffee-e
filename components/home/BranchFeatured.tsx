"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { products, branchProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function BranchFeatured() {
  const { selectedBranch } = useStore();

  if (!selectedBranch) return null;

  // Get featured products for this branch
  const branchProductsData = branchProducts.filter(
    (bp) => bp.branchId === selectedBranch.id && bp.featured
  );

  const featuredProducts = branchProductsData
    .map((bp) => {
      const product = products.find((p) => p.id === bp.productId);
      return product ? { ...product, branchData: bp } : null;
    })
    .filter(Boolean)
    .slice(0, 4);

  // Get all offers for this branch
  const offers = selectedBranch.offers || [];

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-amber-600 text-sm font-medium uppercase tracking-wider">
                {selectedBranch.name} Picks
              </span>
            </div>
            <h2 className="font-serif text-4xl text-stone-900">
              Featured at This Location
            </h2>
          </div>
          <Link href="/shop">
            <Button variant="outline" className="gap-2 border-stone-300">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Branch Offers Banner */}
        {offers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-6 text-white"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <Badge className="bg-white/20 text-white mb-3">
                      {offer.discount ? `${offer.discount}% OFF` : 'Special'}
                    </Badge>
                    <h3 className="font-semibold text-xl mb-2">{offer.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{offer.description}</p>
                    <p className="text-xs text-white/60">
                      Valid until {new Date(offer.validUntil).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Featured Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product!.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/shop/${product!.id}`} className="group block">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 mb-4">
                  <img
                    src={product!.images[0]}
                    alt={product!.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <Badge className="bg-stone-900 text-white">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                    {product!.branchData.availability === "low_stock" && (
                      <Badge className="bg-amber-500 text-white">
                        Low Stock
                      </Badge>
                    )}
                  </div>

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button className="bg-white text-stone-900 hover:bg-white/90">
                      View Details
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">
                    {product!.category}
                  </p>
                  <h3 className="font-medium text-stone-900 group-hover:text-stone-600 transition-colors mb-1">
                    {product!.name}
                  </h3>
                  <p className="text-sm text-stone-500 mb-2 line-clamp-1">
                    {product!.tastingNotes.slice(0, 3).join(" · ")}
                  </p>
                  <p className="font-medium text-stone-900">
                    {formatPrice(product!.branchData.price)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Branch Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Products Available", value: branchProducts.filter(bp => bp.branchId === selectedBranch.id && bp.availability !== "out_of_stock").length.toString() },
            { label: "Customer Rating", value: "4.9" },
            { label: "Years Open", value: "5+" },
            { label: "Daily Visitors", value: "200+" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-3xl md:text-4xl text-stone-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-stone-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
