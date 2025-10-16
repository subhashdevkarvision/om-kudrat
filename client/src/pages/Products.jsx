import FeartureProductSection from "@/components/fearturedProducts/FeartureProductSection";
import FrontSection from "@/components/frontSection/FrontSection";
import React from "react";

const Products = () => {
  return (
    <div className="space-y-20 md:space-y-28">
      <FrontSection />
      <FeartureProductSection />
    </div>
  );
};

export default Products;
