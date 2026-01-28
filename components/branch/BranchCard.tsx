"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Branch } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BranchCardProps {
  branch: Branch;
  onSelect?: () => void;
  isSelected?: boolean;
  variant?: "default" | "compact";
}

export function BranchCard({
  branch,
  onSelect,
  isSelected,
  variant = "default",
}: BranchCardProps) {
  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className={cn(
          "p-4 rounded-xl border-2 cursor-pointer transition-all",
          isSelected
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        )}
        onClick={onSelect}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{branch.name}</h3>
              <Badge
                variant={branch.isOpen ? "default" : "secondary"}
                className={cn(
                  "text-xs",
                  branch.isOpen
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-red-100 text-red-700 hover:bg-red-100"
                )}
              >
                {branch.isOpen ? "Open" : "Closed"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{branch.area}</p>
          </div>
          {onSelect && (
            <Button size="sm" variant={isSelected ? "default" : "outline"}>
              {isSelected ? "Selected" : "Select"}
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "group rounded-2xl border-2 overflow-hidden cursor-pointer transition-all",
        isSelected
          ? "border-primary ring-2 ring-primary/20"
          : "border-border hover:border-primary/50 hover:shadow-lg"
      )}
      onClick={onSelect}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={branch.image}
          alt={branch.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl text-white drop-shadow-lg">{branch.name}</h3>
            <Badge
              variant={branch.isOpen ? "default" : "secondary"}
              className={cn(
                branch.isOpen
                  ? "bg-green-500 text-white hover:bg-green-500"
                  : "bg-red-500 text-white hover:bg-red-500"
              )}
            >
              {branch.isOpen ? "Open Now" : "Closed"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-muted-foreground">{branch.area}</p>
              <p>{branch.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <p>
              {branch.hours.days}: {branch.hours.open} - {branch.hours.close}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <p>{branch.phone}</p>
          </div>
        </div>

        {/* Offers preview */}
        {branch.offers.length > 0 && (
          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">Current offer:</p>
            <p className="text-sm font-medium">{branch.offers[0].title}</p>
          </div>
        )}

        {onSelect && (
          <Button
            className="w-full"
            variant={isSelected ? "default" : "outline"}
          >
            {isSelected ? "Selected" : "Select This Branch"}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
