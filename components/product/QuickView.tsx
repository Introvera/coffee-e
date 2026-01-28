"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Product, BranchProduct, GrindType } from "@/lib/types";
import { useStore } from "@/lib/store";
import { grindOptions } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";

interface QuickViewProps {
  product: Product;
  branchProduct?: BranchProduct;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickView({ product, branchProduct, isOpen, onClose }: QuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedGrind, setSelectedGrind] = useState<GrindType>(
    product.grindOptions[0] || "whole_bean"
  );
  const [quantity, setQuantity] = useState(1);

  const { selectedBranch, addToCart, setIsCartOpen } = useStore();

  const isAvailable = branchProduct?.availability !== "out_of_stock";
  const price = branchProduct?.price || 0;

  const handleAddToCart = () => {
    if (!selectedBranch || !branchProduct || !isAvailable) return;

    addToCart({
      productId: product.id,
      branchId: selectedBranch.id,
      grind: selectedGrind,
      subscriptionPlan: null,
      quantity,
      unitPrice: price,
    });

    onClose();
    setIsCartOpen(true);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[85vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row h-full overflow-auto">
              {/* Image Gallery */}
              <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-full bg-stone-100 flex-shrink-0">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Image navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={cn(
                            "w-2 h-2 rounded-full transition-colors",
                            selectedImage === idx ? "bg-stone-900" : "bg-stone-400"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {branchProduct?.featured && (
                    <Badge className="bg-stone-900 text-white">Featured</Badge>
                  )}
                  {!isAvailable && (
                    <Badge variant="secondary" className="bg-red-100 text-red-700">
                      Out of Stock
                    </Badge>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                <div className="space-y-5">
                  {/* Category */}
                  <Badge variant="outline" className="uppercase text-xs">
                    {product.category}
                  </Badge>

                  {/* Name & Price */}
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl mb-2">
                      {product.name}
                    </h2>
                    {selectedBranch && branchProduct ? (
                      <p className="text-2xl font-medium text-stone-900">
                        {formatPrice(price)}
                        <span className="text-sm font-normal text-stone-500 ml-2">
                          / {product.weight}
                        </span>
                      </p>
                    ) : (
                      <p className="text-stone-500">Select a branch for pricing</p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Tasting Notes */}
                  {product.tastingNotes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.tastingNotes.map((note) => (
                        <Badge key={note} variant="secondary" className="text-xs">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Origin & Roast */}
                  <div className="flex gap-6 text-sm">
                    {product.origin && (
                      <div>
                        <p className="text-stone-500">Origin</p>
                        <p className="font-medium">{product.origin}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-stone-500">Roast</p>
                      <p className="font-medium capitalize">{product.roastLevel}</p>
                    </div>
                  </div>

                  {/* Grind Options */}
                  {product.grindOptions.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Grind</Label>
                      <RadioGroup
                        value={selectedGrind}
                        onValueChange={(value) => setSelectedGrind(value as GrindType)}
                        className="flex flex-wrap gap-2"
                      >
                        {product.grindOptions.map((grindId) => {
                          const grind = grindOptions.find((g) => g.id === grindId);
                          if (!grind) return null;
                          return (
                            <div key={grind.id}>
                              <RadioGroupItem
                                value={grind.id}
                                id={`qv-${grind.id}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`qv-${grind.id}`}
                                className="px-3 py-1.5 text-sm border rounded-full cursor-pointer hover:bg-stone-50 peer-data-[state=checked]:border-stone-900 peer-data-[state=checked]:bg-stone-900 peer-data-[state=checked]:text-white transition-all"
                              >
                                {grind.name}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="flex items-center gap-4">
                    <Label className="text-sm font-medium">Quantity</Label>
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="p-2 hover:bg-stone-50 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="p-2 hover:bg-stone-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    {selectedBranch && isAvailable ? (
                      <Button
                        onClick={handleAddToCart}
                        className="flex-1 gap-2 bg-stone-900 hover:bg-stone-800"
                        size="lg"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart — {formatPrice(price * quantity)}
                      </Button>
                    ) : (
                      <Button disabled className="flex-1" size="lg">
                        {!selectedBranch ? "Select a Branch" : "Out of Stock"}
                      </Button>
                    )}
                  </div>

                  {/* View full details link */}
                  <Link
                    href={`/shop/${product.id}`}
                    onClick={onClose}
                    className="block text-center text-sm text-stone-500 hover:text-stone-900 underline"
                  >
                    View full details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
