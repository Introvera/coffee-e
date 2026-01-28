import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BranchBanner } from "@/components/layout/BranchBanner";
import { CartSheet } from "@/components/cart/CartSheet";
import { CelebrationEffects } from "@/components/effects/CelebrationEffects";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffissimo | Premium Specialty Coffee",
  description: "Discover exceptional single-origin coffees, expertly roasted for the perfect cup. Shop online or visit our Australian cafés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        <div className="grain-overlay" />
        <CelebrationEffects />
        <Header />
        <BranchBanner />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CartSheet />
      </body>
    </html>
  );
}
