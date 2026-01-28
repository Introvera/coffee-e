"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { grindOptions } from "@/lib/data";

export function CartSheet() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartItemQuantity,
    removeFromCart,
    getCartTotal,
    selectedBranch,
  } = useStore();

  const cartTotal = getCartTotal();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
            {cart.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Discover our exceptional coffees
            </p>
            <Button asChild onClick={() => setIsCartOpen(false)}>
              <Link href="/shop">Shop Coffee</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
              <div className="space-y-4">
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-medium text-sm truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {grind?.name || "N/A"} · {product.weight}
                            </p>
                            {item.subscriptionPlan && (
                              <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                Subscribe & Save {item.subscriptionPlan.discount}%
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateCartItemQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-accent transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartItemQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-accent transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-right">
                            {item.subscriptionPlan ? (
                              <>
                                <p className="text-sm font-medium">
                                  {formatPrice(discountedTotal)}
                                </p>
                                <p className="text-xs text-muted-foreground line-through">
                                  {formatPrice(itemTotal)}
                                </p>
                              </>
                            ) : (
                              <p className="text-sm font-medium">
                                {formatPrice(itemTotal)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Cart Summary */}
            <div className="pt-4 space-y-4">
              {selectedBranch && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Pickup from:</span>
                  <span className="font-medium text-foreground">
                    {selectedBranch.name}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Subtotal</span>
                <span className="text-lg font-medium">{formatPrice(cartTotal)}</span>
              </div>

              <p className="text-xs text-muted-foreground">
                Taxes calculated at checkout
              </p>

              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full"
                  size="lg"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link href="/cart">View Full Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
