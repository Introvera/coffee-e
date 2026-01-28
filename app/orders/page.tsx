"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, MapPin, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { branches, products } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";

const statusColors = {
  placed: "bg-amber-100 text-amber-700",
  preparing: "bg-blue-100 text-blue-700",
  ready: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const { orders, selectedBranch } = useStore();
  const hasBranchBanner = !!selectedBranch;

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (sortedOrders.length === 0) {
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
            <Package className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-3xl mb-4">No orders yet</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Once you place an order, it will appear here for easy tracking.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Start Shopping</Link>
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
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl md:text-5xl mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track and review your order history
          </p>
        </motion.div>

        <div className="space-y-4">
          {sortedOrders.map((order, index) => {
            const branch = branches.find((b) => b.id === order.branchId);
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            const previewProducts = order.items.slice(0, 3).map((item) =>
              products.find((p) => p.id === item.productId)
            );

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/order-confirmation?orderId=${order.id}`}>
                  <div className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="font-mono font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={statusColors[order.status]}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{branch?.name || "Unknown branch"}</span>
                      {order.pickupTime && order.pickupTime !== "asap" && (
                        <>
                          <span className="mx-1">·</span>
                          <Clock className="w-4 h-4" />
                          <span>Pickup at {order.pickupTime}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {previewProducts.map(
                            (product, idx) =>
                              product && (
                                <div
                                  key={idx}
                                  className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                                >
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {itemCount} item{itemCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="font-medium">{formatPrice(order.total * 1.2)}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
