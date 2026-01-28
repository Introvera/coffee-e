"use client";

import { motion } from "framer-motion";
import { ExternalLink, Truck, Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const deliveryPartners = [
  {
    name: "Uber Eats",
    logo: "🥡",
    description: "Fast delivery with real-time tracking",
    url: "https://ubereats.com",
    color: "bg-black",
    textColor: "text-white",
    deliveryTime: "20-35 min",
    rating: "4.8",
  },
  {
    name: "DoorDash",
    logo: "🚗",
    description: "Reliable delivery to your doorstep",
    url: "https://doordash.com",
    color: "bg-red-500",
    textColor: "text-white",
    deliveryTime: "25-40 min",
    rating: "4.7",
  },
];

export function DeliveryHome() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&q=80"
            alt="Coffee delivery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-amber-500 text-white text-sm px-4 py-1">
                Delivery Mode
              </Badge>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight drop-shadow-lg">
              Premium Coffee,
              <br />
              Delivered Fresh
            </h1>

            <p className="text-xl text-white/80 mb-8 leading-relaxed drop-shadow-md">
              Enjoy our artisan coffee from the comfort of your home. 
              Order through our trusted delivery partners for fast, 
              reliable service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Delivery Partners Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl text-stone-900 mb-4">
              Order Through Our Partners
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto">
              We've partnered with the best delivery services to bring you 
              fresh coffee and café favorites right to your door.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {deliveryPartners.map((partner, index) => (
              <motion.a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group block"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200 hover:shadow-lg transition-all h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${partner.color} ${partner.textColor} flex items-center justify-center text-3xl`}>
                      {partner.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-stone-900 flex items-center gap-2">
                        {partner.name}
                        <ExternalLink className="w-5 h-5 text-stone-400 group-hover:text-stone-600 transition-colors" />
                      </h3>
                      <p className="text-stone-600">{partner.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-stone-600">
                      <Clock className="w-5 h-5 text-stone-400" />
                      <span>{partner.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-stone-600">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span>{partner.rating}</span>
                    </div>
                  </div>

                  <Button className={`w-full ${partner.color} ${partner.textColor} hover:opacity-90 gap-2`}>
                    Order on {partner.name}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* What's Available Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl text-stone-900 mb-4">
              Available for Delivery
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto">
              Our full range of coffee beans, brewing equipment, and café favorites.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Coffee Beans", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80", count: "12 varieties" },
              { title: "Ready-to-Drink", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80", count: "8 options" },
              { title: "Brewing Gear", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80", count: "15+ items" },
              { title: "Gift Sets", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80", count: "5 sets" },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/70 text-sm">{category.count}</p>
                  <h3 className="text-white text-xl font-medium">{category.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Switch to Pickup CTA */}
      <section className="py-16 bg-stone-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-3xl text-white mb-4">
              Prefer to pick up in person?
            </h3>
            <p className="text-stone-400 mb-8 max-w-lg mx-auto">
              Visit one of our cafés for the full experience. Enjoy freshly brewed 
              coffee and explore our complete range.
            </p>
            <Link href="/branches">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                Find a Location
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
