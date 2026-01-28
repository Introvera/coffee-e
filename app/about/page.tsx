"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "Quality First",
    description:
      "We never compromise on quality. From sourcing the finest beans to the final pour, every step is carefully considered.",
  },
  {
    title: "Direct Trade",
    description:
      "We build lasting relationships with farmers, paying fair prices and ensuring sustainable practices.",
  },
  {
    title: "Small Batch",
    description:
      "Our coffee is roasted in small batches to ensure freshness and allow each origin's unique character to shine.",
  },
  {
    title: "Community",
    description:
      "Coffee brings people together. Our cafés are spaces for connection, conversation, and creativity.",
  },
];

const timeline = [
  {
    year: "2015",
    title: "The Beginning",
    description:
      "Started as a small roastery in East London, driven by a passion for exceptional coffee.",
  },
  {
    year: "2017",
    title: "First Café",
    description:
      "Opened our flagship café in Shoreditch, bringing our coffee directly to the community.",
  },
  {
    year: "2019",
    title: "Direct Trade",
    description:
      "Established our first direct trade partnership with farmers in Ethiopia.",
  },
  {
    year: "2021",
    title: "Expansion",
    description:
      "Grew to four locations across London while maintaining our commitment to quality.",
  },
  {
    year: "2024",
    title: "Today",
    description:
      "Serving exceptional coffee to thousands of customers daily while continuing to innovate.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="min-h-screen page-transition">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80"
            alt="Coffee roasting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-lg">
              Our Story
            </h1>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
              What began as a small roastery in East London has grown into a
              community of coffee lovers united by a simple belief: that
              exceptional coffee can change your day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">
                Our Mission
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">
                Coffee worth
                <br />
                <span className="italic">savoring</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We believe that great coffee is more than just a beverage—it's
                  an experience. From the moment you smell the beans to the last
                  sip, every cup should tell a story.
                </p>
                <p>
                  That's why we source only the finest single-origin beans,
                  roasted in small batches to bring out their unique character.
                  We work directly with farmers who share our commitment to
                  quality and sustainability.
                </p>
                <p>
                  Whether you're enjoying a quiet moment alone or catching up
                  with friends, we want our coffee to be the highlight of your
                  day.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
                  alt="Barista making coffee"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-stone-900 text-white p-6 rounded-xl shadow-xl">
                <p className="font-serif text-4xl mb-1">9+</p>
                <p className="text-sm text-stone-300">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={containerRef} className="py-24 bg-muted/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">
              What We Believe
            </span>
            <h2 className="font-serif text-4xl md:text-5xl">Our Values</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-2xl text-primary">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-medium text-xl mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">
              Our Journey
            </span>
            <h2 className="font-serif text-4xl md:text-5xl">
              A decade of coffee
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Year marker */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2" />

                  {/* Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <span className="text-sm text-muted-foreground">
                      {item.year}
                    </span>
                    <h3 className="font-medium text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Quote */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <blockquote className="font-serif text-3xl md:text-4xl leading-relaxed mb-8">
              "We don't just serve coffee—we share moments. Every cup is an
              invitation to pause, reflect, and connect."
            </blockquote>
            <p className="text-primary-foreground/70">
              — The Coffissimo Team
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              Ready to taste the difference?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Explore our collection of exceptional coffees or visit one of our
              London cafés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/shop">
                  Shop Coffee
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/visit">Visit a Café</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
