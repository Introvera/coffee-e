"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Clock, Phone, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { branches, products, grindOptions } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { getOrder, selectedBranch } = useStore();
  const order = orderId ? getOrder(orderId) : null;
  const hasBranchBanner = !!selectedBranch;

  if (!order) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Order not found</h1>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const branch = branches.find((b) => b.id === order.branchId);

  return (
    <div className={cn(
      "min-h-screen pb-16 page-transition",
      hasBranchBanner ? "pt-32 md:pt-36" : "pt-24"
    )}>
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your order. We're preparing your coffee now.
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border overflow-hidden mb-8"
        >
          {/* Order Header */}
          <div className="p-6 bg-muted/50 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="font-mono font-medium text-lg">{order.orderNumber}</p>
              </div>
              <Badge className="w-fit bg-amber-100 text-amber-700 hover:bg-amber-100">
                <Package className="w-3 h-3 mr-1" />
                {order.status === "placed" ? "Order Placed" : order.status}
              </Badge>
            </div>
          </div>

          {/* Pickup Info */}
          {branch && (
            <div className="p-6 border-b">
              <h2 className="font-medium text-lg mb-4">Pickup Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{branch.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {branch.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {order.pickupTime && order.pickupTime !== "asap"
                        ? `Pickup at ${order.pickupTime}`
                        : "Ready as soon as possible"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Hours: {branch.hours.open} - {branch.hours.close}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">{branch.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="p-6 border-b">
            <h2 className="font-medium text-lg mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;

                const grind = grindOptions.find((g) => g.id === item.grind);
                const itemTotal = item.unitPrice * item.quantity;
                const discountedTotal = item.subscriptionPlan
                  ? itemTotal * (1 - item.subscriptionPlan.discount / 100)
                  : itemTotal;

                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {grind?.name} · Qty: {item.quantity}
                      </p>
                      {item.subscriptionPlan && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          Subscription -{item.subscriptionPlan.discount}%
                        </Badge>
                      )}
                    </div>
                    <p className="font-medium">{formatPrice(discountedTotal)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Total */}
          <div className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes (20%)</span>
                <span>{formatPrice(order.subtotal * 0.2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>{formatPrice(order.total * 1.2)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-muted/50 rounded-xl p-6 mb-8"
        >
          <h3 className="font-medium mb-3">Pickup Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Show your order confirmation at the counter</li>
            <li>We'll have your order ready for you</li>
            <li>Enjoy your coffee!</li>
          </ol>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/orders">View My Orders</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/shop">
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Customer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            Order placed for {order.customerName}
          </p>
          <p className="text-sm text-muted-foreground">
            Confirmation sent to {order.customerPhone}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
