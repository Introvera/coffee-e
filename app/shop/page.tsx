"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProductGrid, ProductGridSkeleton } from "@/components/product/ProductGrid";
import { products, branchProducts, categories } from "@/lib/data";
import { useStore } from "@/lib/store";
import { ProductCategory, RoastLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

const roastLevels: { id: RoastLevel; name: string }[] = [
  { id: "light", name: "Light" },
  { id: "medium", name: "Medium" },
  { id: "medium-dark", name: "Medium-Dark" },
  { id: "dark", name: "Dark" },
];

const allTastingNotes = Array.from(
  new Set(products.flatMap((p) => p.tastingNotes))
).sort();

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as ProductCategory | null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "all"
  );
  const [selectedRoast, setSelectedRoast] = useState<string>("all");
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { selectedBranch } = useStore();

  const currentBranchProducts = selectedBranch
    ? branchProducts.filter((bp) => bp.branchId === selectedBranch.id)
    : [];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Roast level filter
    if (selectedRoast !== "all") {
      filtered = filtered.filter((p) => p.roastLevel === selectedRoast);
    }

    // Tasting notes filter
    if (selectedNotes.length > 0) {
      filtered = filtered.filter((p) =>
        selectedNotes.some((note) => p.tastingNotes.includes(note))
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tastingNotes.some((note) => note.toLowerCase().includes(query)) ||
          p.origin.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === "price_low" && selectedBranch) {
      filtered.sort((a, b) => {
        const priceA =
          currentBranchProducts.find((bp) => bp.productId === a.id)?.price || 0;
        const priceB =
          currentBranchProducts.find((bp) => bp.productId === b.id)?.price || 0;
        return priceA - priceB;
      });
    } else if (sortBy === "price_high" && selectedBranch) {
      filtered.sort((a, b) => {
        const priceA =
          currentBranchProducts.find((bp) => bp.productId === a.id)?.price || 0;
        const priceB =
          currentBranchProducts.find((bp) => bp.productId === b.id)?.price || 0;
        return priceB - priceA;
      });
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Featured - put featured items first
      filtered.sort((a, b) => {
        const aFeatured = currentBranchProducts.find(
          (bp) => bp.productId === a.id
        )?.featured;
        const bFeatured = currentBranchProducts.find(
          (bp) => bp.productId === b.id
        )?.featured;
        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;
        return 0;
      });
    }

    return filtered;
  }, [
    selectedCategory,
    selectedRoast,
    selectedNotes,
    searchQuery,
    sortBy,
    selectedBranch,
    currentBranchProducts,
  ]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedRoast !== "all" ? 1 : 0) +
    selectedNotes.length;

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedRoast("all");
    setSelectedNotes([]);
    setSearchQuery("");
  };

  // Extra padding when branch banner is shown
  const hasBranchBanner = !!selectedBranch;

  return (
    <div className={cn(
      "min-h-screen pb-16 page-transition",
      hasBranchBanner ? "pt-32 md:pt-36" : "pt-24"
    )}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Shop Coffee</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our collection of exceptional single-origin coffees and
            expertly crafted blends
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 overflow-x-auto no-scrollbar"
        >
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="inline-flex w-auto h-auto bg-transparent gap-2 p-0">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2"
              >
                All
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search coffees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48 h-12">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-1">{activeFiltersCount}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                {/* Roast Level */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Roast Level
                  </Label>
                  <div className="space-y-2">
                    {roastLevels.map((roast) => (
                      <div key={roast.id} className="flex items-center gap-2">
                        <Checkbox
                          id={roast.id}
                          checked={selectedRoast === roast.id}
                          onCheckedChange={(checked) =>
                            setSelectedRoast(checked ? roast.id : "all")
                          }
                        />
                        <Label htmlFor={roast.id} className="text-sm">
                          {roast.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasting Notes */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Tasting Notes
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {allTastingNotes.slice(0, 12).map((note) => (
                      <Badge
                        key={note}
                        variant={
                          selectedNotes.includes(note) ? "default" : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedNotes((prev) =>
                            prev.includes(note)
                              ? prev.filter((n) => n !== note)
                              : [...prev, note]
                          );
                        }}
                      >
                        {note}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {categories.find((c) => c.id === selectedCategory)?.name}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setSelectedCategory("all")}
                />
              </Badge>
            )}
            {selectedRoast !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {roastLevels.find((r) => r.id === selectedRoast)?.name}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setSelectedRoast("all")}
                />
              </Badge>
            )}
            {selectedNotes.map((note) => (
              <Badge key={note} variant="secondary" className="gap-1">
                {note}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() =>
                    setSelectedNotes((prev) => prev.filter((n) => n !== note))
                  }
                />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-6 text-xs"
            >
              Clear all
            </Button>
          </motion.div>
        )}

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground mb-6"
        >
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""} found
          {selectedBranch && ` at ${selectedBranch.name}`}
        </motion.p>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          branchProducts={currentBranchProducts}
        />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-16"><div className="container mx-auto px-4"><ProductGridSkeleton /></div></div>}>
      <ShopContent />
    </Suspense>
  );
}
