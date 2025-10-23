import BestSpeciesPulses from "@/components/BestSpeciesPulses";
import OurNewProduct from "@/components/OurNewProduct";
import SeedSection from "@/components/SeedSection";
import React from "react";
import OurBestSellingProducts from "@/components/OurBestSellingProducts";
import PulseAndSpices from "@/components/PulseAndSpices";
import TrendingProducts from "@/components/trendingProductSection/TrendingProducts";
import Testimonial from "@/components/testimonial/Testimonial";
import ServiceHighlights from "@/components/serviceHighlights/ServiceHighlights";
import ExclusiveOffers from "@/components/exclusiveOffers/ExclusiveOffers";
import HeroSection from "@/components/HeroSection";

const Home = () => {
  return (
    <div className=" space-y-20 md:space-y-28">
      <HeroSection />
      <SeedSection />
      <OurNewProduct />
      <BestSpeciesPulses />
      <OurBestSellingProducts />
      <PulseAndSpices />
      <TrendingProducts />
      <Testimonial />
      <ServiceHighlights />
      <ExclusiveOffers />
    </div>
  );
};

export default Home;
