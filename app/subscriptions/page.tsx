"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, RefreshCw, Truck, Percent, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { subscriptionFrequencies, products } from "@/lib/data";

const benefits = [
  {
    icon: Percent,
    title: "Save up to 15%",
    description: "Automatic savings on every order, no coupon needed",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "All subscription orders ship free, always",
  },
  {
    icon: RefreshCw,
    title: "Flexible Schedule",
    description: "Pause, skip, or cancel anytime with no fees",
  },
  {
    icon: Coffee,
    title: "Fresh Coffee",
    description: "Roasted and shipped within 48 hours of your delivery",
  },
];

const subscribableProducts = products.filter((p) => p.isSubscribable).slice(0, 6);

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen page-transition">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80"
            alt="Coffee"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6">
              Subscribe & Save
            </Badge>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">
              Never run out of
              <br />
              <span className="italic">great coffee</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Subscribe to your favorite coffees and enjoy automatic savings,
              free shipping, and the convenience of delivery on your schedule.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/shop">
                Start Your Subscription
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Getting started is easy. Choose your coffee, set your schedule,
              and we'll handle the rest.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Choose Your Coffee",
                description:
                  "Pick any subscribable coffee from our collection. Mix and match as many as you like.",
              },
              {
                step: "02",
                title: "Set Your Schedule",
                description:
                  "Choose weekly, bi-weekly, or monthly delivery. Change it anytime.",
              },
              {
                step: "03",
                title: "Enjoy & Save",
                description:
                  "We'll roast and ship fresh coffee right to your door. Save up to 15% on every order.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-2xl text-primary">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-medium text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              Choose Your Frequency
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The more often you order, the more you save. All frequencies
              include free shipping.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {subscriptionFrequencies.map((freq, index) => (
              <motion.div
                key={freq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border-2 ${
                  freq.id === "weekly"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background"
                }`}
              >
                {freq.id === "weekly" && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Best Value
                  </Badge>
                )}
                <div className="text-center">
                  <h3 className="font-medium text-xl mb-2">{freq.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="font-serif text-4xl">{freq.discount}%</span>
                    <span className="text-muted-foreground">off</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      Free shipping
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      Pause anytime
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      Cancel anytime
                    </li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              Subscriber Benefits
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              Popular Subscriptions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our most loved coffees, available on subscription
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {subscribableProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/shop/${product.id}`}>
                  <div className="group bg-background rounded-xl overflow-hidden border hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-medium mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {product.tastingNotes.slice(0, 3).join(" · ")}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        Subscribe & Save 15%
                      </Badge>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg">
              <Link href="/shop">
                View All Coffee
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              Ready to subscribe?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8">
              Join thousands of coffee lovers who never run out of their
              favorite brew.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/shop">
                Start Your Subscription
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
