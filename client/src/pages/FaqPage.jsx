import FaqsComponent from "@/components/faqs/FaqsComponent";
import FrontSection from "@/components/frontSection/FrontSection";
import OurBestSellingProducts from "@/components/OurBestSellingProducts";
import React from "react";

const FaqPage = () => {
  return (
    <div className="space-y-10">
      <FrontSection
        imgUrl="/faq-header-img.png"
        title="FAQs"
        path="Home"
        subPath="FAQs"
      />
      <FaqsComponent />
      <OurBestSellingProducts />
    </div>
  );
};

export default FaqPage;
