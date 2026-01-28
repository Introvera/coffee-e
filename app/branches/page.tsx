"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BranchCard } from "@/components/branch/BranchCard";
import { branches } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function BranchesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedBranch, setSelectedBranch, setOrderType } = useStore();

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectBranch = (branch: typeof branches[0]) => {
    setSelectedBranch(branch);
    setOrderType("pickup");
    router.push("/");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 page-transition">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            Pick Up
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Choose your branch
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select a location to see local offers, prices, and availability.
            Your cart will be tailored to this branch.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, area, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
        </motion.div>

        {/* Branch Grid */}
        {filteredBranches.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredBranches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <BranchCard
                  branch={branch}
                  isSelected={selectedBranch?.id === branch.id}
                  onSelect={() => handleSelectBranch(branch)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No branches found matching "{searchQuery}"
            </p>
          </div>
        )}

        {/* Note about closed branches */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Note: You can select a closed branch to browse, but checkout will be
          disabled until the branch reopens.
        </motion.p>
      </div>
    </div>
  );
}
