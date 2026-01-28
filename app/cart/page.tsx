"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { products, grindOptions } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";

export default function CartPage() {
  const {
    cart,
    updateCartItemQuantity,
    removeFromCart,
    getCartTotal,
    selectedBranch,
    clearCart,
  } = useStore();

  const cartTotal = getCartTotal();
  
  // Extra padding when branch banner is shown
  const hasBranchBanner = !!selectedBranch;

  if (cart.length === 0) {
    return (
      <div className={cn(
        "min-h-screen pb-16 flex items-center justify-center page-transition",
        hasBranchBanner ? "pt-32 md:pt-36" : "pt-24"
      )}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-3xl mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Looks like you haven't added any coffee yet. Explore our collection
            and find your perfect cup.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Shop Coffee</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen pb-16 page-transition",
      hasBranchBanner ? "pt-32 md:pt-36" : "pt-24"
    )}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl md:text-5xl mb-2">Your Cart</h1>
          <p className="text-muted-foreground">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {cart.map((item, index) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;

                const grind = grindOptions.find((g) => g.id === item.grind);
                const itemTotal = item.unitPrice * item.quantity;
                const discountedTotal = item.subscriptionPlan
                  ? itemTotal * (1 - item.subscriptionPlan.discount / 100)
                  : itemTotal;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-6 p-4 bg-card rounded-xl border"
                  >
                    {/* Product Image */}
                    <Link href={`/shop/${product.id}`}>
                      <div className="relative w-28 h-28 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link href={`/shop/${product.id}`}>
                            <h3 className="font-medium text-lg hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {grind?.name || "N/A"} · {product.weight}
                          </p>
                          {item.subscriptionPlan && (
                            <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              Subscribe & Save {item.subscriptionPlan.discount}% ·{" "}
                              {item.subscriptionPlan.frequency}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity - 1)
                            }
                            className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-accent transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity + 1)
                            }
                            className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-accent transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          {item.subscriptionPlan ? (
                            <>
                              <p className="font-medium text-lg">
                                {formatPrice(discountedTotal)}
                              </p>
                              <p className="text-sm text-muted-foreground line-through">
                                {formatPrice(itemTotal)}
                              </p>
                            </>
                          ) : (
                            <p className="font-medium text-lg">
                              {formatPrice(itemTotal)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Clear Cart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Button
                variant="ghost"
                className="text-muted-foreground"
                onClick={clearCart}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card rounded-xl border p-6 sticky top-24">
              <h2 className="font-medium text-xl mb-6">Order Summary</h2>

              {selectedBranch && (
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Pickup from</p>
                  <p className="font-medium">{selectedBranch.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedBranch.address}
                  </p>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between text-lg font-medium mb-6">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              {selectedBranch && !selectedBranch.isOpen ? (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800">
                        Branch is currently closed
                      </p>
                      <p className="text-sm text-amber-700 mt-1">
                        You can still browse, but checkout is unavailable until the
                        branch reopens.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <Button
                asChild
                className="w-full"
                size="lg"
                disabled={!selectedBranch || !selectedBranch.isOpen}
              >
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              {!selectedBranch && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Please{" "}
                  <Link href="/branches" className="underline">
                    select a branch
                  </Link>{" "}
                  to checkout
                </p>
              )}

              <Button asChild variant="outline" className="w-full mt-3">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
