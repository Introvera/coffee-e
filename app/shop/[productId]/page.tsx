"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { products, branchProducts, grindOptions } from "@/lib/data";
import { useStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";
import { GrindType } from "@/lib/types";

export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const router = useRouter();
  const { selectedBranch, addToCart, setIsCartOpen } = useStore();

  const product = products.find((p) => p.id === productId);
  const branchProduct = selectedBranch
    ? branchProducts.find(
        (bp) => bp.branchId === selectedBranch.id && bp.productId === productId
      )
    : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedGrind, setSelectedGrind] = useState<GrindType>(
    product?.grindOptions[0] || "whole_bean"
  );
  const [quantity, setQuantity] = useState(1);

  // Extra padding when branch banner is shown
  const hasBranchBanner = !!selectedBranch;

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Product not found</h1>
          <Button asChild>
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isAvailable = branchProduct?.availability !== "out_of_stock";
  const isLowStock = branchProduct?.availability === "low_stock";
  const price = branchProduct?.price || 0;
  const totalPrice = price * quantity;

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

    setIsCartOpen(true);
  };

  return (
    <div className={cn(
      "min-h-screen pb-16 page-transition",
      hasBranchBanner ? "pt-32 md:pt-36" : "pt-24"
    )}>
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" size="sm" asChild className="gap-1">
            <Link href="/shop">
              <ChevronLeft className="w-4 h-4" />
              Back to Shop
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category & Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="uppercase text-xs">
                {product.category}
              </Badge>
              {branchProduct?.featured && (
                <Badge className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
              {!isAvailable && (
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  Out of Stock
                </Badge>
              )}
              {isLowStock && isAvailable && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-700"
                >
                  Low Stock
                </Badge>
              )}
            </div>

            {/* Name & Price */}
            <div>
              <h1 className="font-serif text-4xl md:text-5xl mb-2">
                {product.name}
              </h1>
              {selectedBranch && branchProduct ? (
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl font-medium">
                    {formatPrice(price)}
                  </p>
                  <span className="text-muted-foreground">/ {product.weight}</span>
                </div>
              ) : (
                <p className="text-lg text-muted-foreground">
                  Select a branch to see pricing
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              {product.origin && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Origin
                  </p>
                  <p className="font-medium">{product.origin}</p>
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Roast Level
                </p>
                <p className="font-medium capitalize">{product.roastLevel}</p>
              </div>
            </div>

            {/* Tasting Notes */}
            {product.tastingNotes.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Tasting Notes
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tastingNotes.map((note) => (
                    <Badge key={note} variant="outline">
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Grind Options */}
            {product.grindOptions.length > 0 && (
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Grind Type
                </Label>
                <RadioGroup
                  value={selectedGrind}
                  onValueChange={(value) => setSelectedGrind(value as GrindType)}
                  className="grid grid-cols-2 gap-2"
                >
                  {product.grindOptions.map((grindId) => {
                    const grind = grindOptions.find((g) => g.id === grindId);
                    if (!grind) return null;
                    return (
                      <div key={grind.id}>
                        <RadioGroupItem
                          value={grind.id}
                          id={grind.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={grind.id}
                          className="flex flex-col items-start p-3 border rounded-lg cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                        >
                          <span className="font-medium text-sm">{grind.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {grind.description}
                          </span>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            )}

            {/* Quantity */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Quantity</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-accent transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 hover:bg-accent transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {selectedBranch && branchProduct && (
                  <p className="text-lg font-medium">
                    Total: {formatPrice(totalPrice)}
                  </p>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            {!selectedBranch ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">
                      Select a branch to continue
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      Prices and availability vary by location.
                    </p>
                    <Button asChild size="sm" className="mt-3">
                      <Link href="/branches">Choose Branch</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ) : !isAvailable ? (
              <Button disabled className="w-full" size="lg">
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={handleAddToCart}
                className="w-full gap-2"
                size="lg"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart — {formatPrice(totalPrice)}
              </Button>
            )}

            {/* Pickup info */}
            {selectedBranch && (
              <p className="text-sm text-muted-foreground text-center">
                <Check className="w-4 h-4 inline mr-1" />
                Ready for pickup at {selectedBranch.name}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
