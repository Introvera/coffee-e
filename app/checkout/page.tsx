"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, CreditCard, Clock, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { products, grindOptions } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s\-+()]+$/, "Please enter a valid phone number"),
  pickupTime: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Generate pickup time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 7; hour <= 19; hour++) {
    for (let min of [0, 30]) {
      const time = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
      const label = `${hour > 12 ? hour - 12 : hour}:${min.toString().padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
      slots.push({ value: time, label });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const { cart, selectedBranch, getCartTotal, createOrder } = useStore();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      pickupTime: "",
    },
  });

  const cartTotal = getCartTotal();
  
  // Extra padding when branch banner is shown
  const hasBranchBanner = !!selectedBranch;

  // Redirect if cart is empty or no branch selected
  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
          <Button asChild>
            <Link href="/shop">Shop Coffee</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!selectedBranch) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Please select a branch</h1>
          <Button asChild>
            <Link href="/branches">Select Branch</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!selectedBranch.isOpen) {
    return (
      <div className={cn(
        "min-h-screen pb-16 flex items-center justify-center",
        hasBranchBanner ? "pt-32 md:pt-36" : "pt-24"
      )}>
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-medium mb-4">Branch is closed</h1>
          <p className="text-muted-foreground mb-6">
            {selectedBranch.name} is currently closed. Please try again during
            operating hours or select a different branch.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/branches">Change Branch</Link>
            </Button>
            <Button asChild>
              <Link href="/cart">Back to Cart</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const order = createOrder(
      data.customerName,
      data.customerPhone,
      data.pickupTime
    );

    router.push(`/order-confirmation?orderId=${order.id}`);
  };

  return (
    <div className={cn(
      "min-h-screen pb-16 page-transition",
      hasBranchBanner ? "pt-32 md:pt-36" : "pt-24"
    )}>
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" size="sm" asChild className="gap-1 mb-4">
            <Link href="/cart">
              <ChevronLeft className="w-4 h-4" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="font-serif text-4xl md:text-5xl">Checkout</h1>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Pickup Details */}
                <div className="bg-card rounded-xl border p-6">
                  <h2 className="font-medium text-xl mb-6">Pickup Details</h2>

                  <div className="mb-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Picking up from
                    </p>
                    <p className="font-medium">{selectedBranch.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedBranch.address}
                    </p>
                    <p className="text-sm mt-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Open {selectedBranch.hours.open} -{" "}
                      {selectedBranch.hours.close}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+44 7123 456789"
                              type="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pickupTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Preferred Pickup Time{" "}
                            <span className="text-muted-foreground font-normal">
                              (optional)
                            </span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time (or ASAP)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="asap">As soon as possible</SelectItem>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                  {slot.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-card rounded-xl border p-6">
                  <h2 className="font-medium text-xl mb-6">Payment</h2>

                  <div className="p-4 bg-muted rounded-lg text-center">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Payment simulation
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Click "Pay Now" to simulate a successful payment
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Pay Now — {formatPrice(cartTotal)}</>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-xl border p-6 sticky top-24">
              <h2 className="font-medium text-xl mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;

                  const grind = grindOptions.find((g) => g.id === item.grind);
                  const itemTotal = item.unitPrice * item.quantity;
                  const discountedTotal = item.subscriptionPlan
                    ? itemTotal * (1 - item.subscriptionPlan.discount / 100)
                    : itemTotal;

                  return (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {grind?.name} · Qty: {item.quantity}
                        </p>
                        {item.subscriptionPlan && (
                          <p className="text-xs text-primary">
                            Subscribe -{item.subscriptionPlan.discount}%
                          </p>
                        )}
                      </div>
                      <p className="font-medium text-sm">
                        {formatPrice(discountedTotal)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>{formatPrice(cartTotal * 0.2)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>{formatPrice(cartTotal * 1.2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
