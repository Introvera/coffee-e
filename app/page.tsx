"use client";

import { LandingHero } from "@/components/home/LandingHero";
import { BranchHero } from "@/components/home/BranchHero";
import { DeliveryHome } from "@/components/home/DeliveryHome";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { BranchFeatured } from "@/components/home/BranchFeatured";
import { OurApproach } from "@/components/home/OurApproach";
import { VisitTeaser } from "@/components/home/VisitTeaser";
import { Newsletter } from "@/components/home/Newsletter";
import { useStore } from "@/lib/store";

export default function Home() {
  const { orderType, selectedBranch } = useStore();

  // If delivery is selected, show delivery home
  if (orderType === "delivery") {
    return <DeliveryHome />;
  }

  // If pickup with branch selected, show branch-specific home
  if (orderType === "pickup" && selectedBranch) {
    return (
      <div className="page-transition">
        <BranchHero />
        <BranchFeatured />
        <OurApproach />
        <VisitTeaser />
        <Newsletter />
      </div>
    );
  }

  // Default: Initial landing page (no order type selected)
  return (
    <div className="page-transition">
      <LandingHero />
      <FeaturedCollections />
      <OurApproach />
      <VisitTeaser />
      <Newsletter />
    </div>
  );
}
