import BestSpeciesPulses from "@/components/BestSpeciesPulses";
// import HeroSection from "@/components/homePage/HeroSection";
import Navbar from "@/components/Navbar";
import OurNewProduct from "@/components/OurNewProduct";
import ProductCard from "@/components/ProductCard";
import SeedSection from "@/components/SeedSection";
import React from "react";
import OurBestSellingProducts from "@/components/OurBestSellingProducts";
import PulseAndSpices from "@/components/PulseAndSpices";
import TrendingProducts from "@/components/trendingProductSection/TrendingProducts";
import Testimonial from "@/components/testimonial/Testimonial";
import ServiceHighlights from "@/components/serviceHighlights/ServiceHighlights";
import ExclusiveOffers from "@/components/exclusiveOffers/ExclusiveOffers";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/HeroSection";

const Home = () => {
  return (
    <div className="px-5 py-4 container xl:px-0 mx-auto space-y-10 md:space-y-28">
      <Navbar />
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
      <Footer />
    </div>
  );
};

export default Home;
