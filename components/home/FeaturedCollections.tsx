"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";

const collectionImages: Record<string, string> = {
  espresso: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80",
  filter: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
  pods: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=600&q=80",
  matcha: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80",
  gifts: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600&q=80",
  equipment: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80",
  merchandise: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
};

export function FeaturedCollections() {
  const featuredCategories = categories.slice(0, 5);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Shop by Collection
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From single-origin espresso to ceremonial matcha, discover your perfect cup
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/shop?category=${category.id}`}>
                <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src={collectionImages[category.id]}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-xl text-white mb-1 drop-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-stone-200 text-sm flex items-center gap-1 group-hover:text-white transition-colors drop-shadow-md">
                      Shop now
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
