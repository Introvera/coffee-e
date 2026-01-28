"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, MapPin, ChevronDown, Truck, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { OrderTypeSwitcher } from "./OrderTypeSwitcher";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/visit", label: "Visit" },
  { href: "/about", label: "About" },
  { href: "/faqs", label: "FAQs" },
];

// Pages with dark hero backgrounds where we need white text
const darkHeroPages = ["/", "/about", "/subscriptions"];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const { selectedBranch, orderType, setIsCartOpen, cart, setSelectedBranch, setOrderType, clearCart } = useStore();
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Check if current page has a dark hero
  const hasDarkHero = darkHeroPages.includes(pathname);
  // Use light text only when on dark hero pages AND not scrolled
  const useLightText = hasDarkHero && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChangeBranch = () => {
    setSelectedBranch(null);
    setOrderType(null);
    clearCart();
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3" 
            : hasDarkHero 
              ? "bg-transparent py-5" 
              : "bg-white/95 backdrop-blur-md py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className={cn(
              "font-serif text-2xl font-medium tracking-tight",
              useLightText ? "text-white drop-shadow-md" : "text-stone-900"
            )}>
              Coffissimo
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== "/" && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm tracking-wide transition-colors py-1",
                    useLightText 
                      ? "text-white/90 hover:text-white drop-shadow-sm" 
                      : "text-stone-700 hover:text-stone-900",
                    isActive && (useLightText ? "text-white font-medium" : "text-stone-900 font-medium")
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span 
                      className={cn(
                        "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                        useLightText ? "bg-white" : "bg-stone-900"
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Order Type Switcher - only show when order type is selected */}
            <div className="hidden sm:block">
              <OrderTypeSwitcher />
            </div>

            {/* Cart button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "relative",
                useLightText 
                  ? "text-white hover:bg-white/10 hover:text-white" 
                  : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
              )}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    "absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full flex items-center justify-center font-medium",
                    useLightText ? "bg-white text-stone-900" : "bg-stone-900 text-white"
                  )}
                >
                  {itemCount}
                </motion.span>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden",
                useLightText 
                  ? "text-white hover:bg-white/10 hover:text-white" 
                  : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
              )}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 md:hidden shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-stone-200">
                  <span className="font-serif text-xl text-stone-900">Menu</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-stone-700 hover:bg-stone-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Mobile Order Type Display */}
                {orderType ? (
                  <div className="p-4 border-b border-stone-200">
                    <div className="flex items-center gap-3">
                      {orderType === "delivery" ? (
                        <>
                          <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center">
                            <Truck className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-stone-500">Order type</p>
                            <p className="font-medium text-stone-900">Delivery</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center">
                            <Store className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-stone-500">
                              {selectedBranch ? "Pickup from" : "Select location"}
                            </p>
                            <p className="font-medium text-stone-900">
                              {selectedBranch ? selectedBranch.name : "Choose a branch"}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      {orderType === "pickup" && (
                        <Link
                          href="/branches"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex-1 text-center text-sm py-2 px-3 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                        >
                          Change branch
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleChangeBranch();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex-1 text-center text-sm py-2 px-3 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        Start over
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-4 border-b border-stone-200 text-left hover:bg-stone-50 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-stone-600" />
                    <div>
                      <p className="text-sm text-stone-500">Get started</p>
                      <p className="font-medium text-stone-900">Choose delivery or pickup</p>
                    </div>
                    <ChevronDown className="w-4 h-4 ml-auto text-stone-400" />
                  </Link>
                )}

                <nav className="flex-1 py-4">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href || 
                      (link.href !== "/" && pathname.startsWith(link.href));
                    
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-6 py-3 text-lg transition-colors",
                            isActive 
                              ? "text-stone-900 font-medium bg-stone-50" 
                              : "text-stone-600 hover:bg-stone-50 hover:text-stone-800"
                          )}
                        >
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                          )}
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="p-4 border-t border-stone-200">
                  <Button
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white"
                    onClick={() => {
                      setIsCartOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    View Cart {itemCount > 0 && `(${itemCount})`}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
