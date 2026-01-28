"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, BranchProduct } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { QuickView } from "./QuickView";

interface ProductCardProps {
  product: Product;
  branchProduct?: BranchProduct;
}

export function ProductCard({ product, branchProduct }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { selectedBranch, addToCart, setIsCartOpen } = useStore();

  const isAvailable = branchProduct?.availability !== "out_of_stock";
  const isLowStock = branchProduct?.availability === "low_stock";
  const price = branchProduct?.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedBranch || !branchProduct || !isAvailable) return;

    addToCart({
      productId: product.id,
      branchId: selectedBranch.id,
      grind: product.grindOptions[0] || "whole_bean",
      subscriptionPlan: null,
      quantity: 1,
      unitPrice: branchProduct.price,
    });

    setIsCartOpen(true);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <Link href={`/shop/${product.id}`}>
        <motion.div
          className="group relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {/* Image Container */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 mb-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {branchProduct?.featured && (
                <Badge className="bg-stone-900 text-white">
                  Featured
                </Badge>
              )}
              {!isAvailable && (
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  Out of Stock
                </Badge>
              )}
              {isLowStock && isAvailable && (
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                  Low Stock
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/30 flex items-center justify-center gap-2"
            >
              <Button
                size="sm"
                variant="secondary"
                className="gap-1.5 bg-white hover:bg-white/90 text-stone-900"
                onClick={handleQuickView}
              >
                <Eye className="w-4 h-4" />
                Quick View
              </Button>
              {selectedBranch && isAvailable && (
                <Button 
                  size="sm" 
                  className="gap-1.5 bg-stone-900 hover:bg-stone-800" 
                  onClick={handleQuickAdd}
                >
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              )}
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            {/* Category */}
            <p className="text-xs text-stone-500 uppercase tracking-wider">
              {product.category}
            </p>

            {/* Name */}
            <h3 className="font-medium text-stone-900 group-hover:text-stone-600 transition-colors line-clamp-1">
              {product.name}
            </h3>

            {/* Tasting Notes */}
            {product.tastingNotes.length > 0 && (
              <p className="text-sm text-stone-500 line-clamp-1">
                {product.tastingNotes.slice(0, 3).join(" · ")}
              </p>
            )}

            {/* Price */}
            <div className="flex items-center justify-between pt-1">
              {price ? (
                <p className="font-medium text-stone-900">{formatPrice(price)}</p>
              ) : (
                <p className="text-sm text-stone-500">Select a branch for pricing</p>
              )}
            </div>
          </div>
        </motion.div>
      </Link>

      {/* Quick View Modal */}
      <QuickView
        product={product}
        branchProduct={branchProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
