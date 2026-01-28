"use client";

import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function PageWrapper({ children, className, noPadding }: PageWrapperProps) {
  const { selectedBranch, orderType } = useStore();
  const pathname = usePathname();
  
  // Check if we should show the branch banner (not on home page, not delivery mode)
  const showBanner = selectedBranch && orderType !== "delivery" && pathname !== "/";

  return (
    <div className={cn(
      !noPadding && (showBanner ? "pt-32 md:pt-36" : "pt-24"),
      className
    )}>
      {children}
    </div>
  );
}
