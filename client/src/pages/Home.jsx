import BestSpeciesPulses from "@/components/BestSpeciesPulses";
// import HeroSection from "@/components/homePage/HeroSection";
import Navbar from "@/components/Navbar";
import OurNewProduct from "@/components/OurNewProduct";
import ProductCard from "@/components/ProductCard";
import SeedSection from "@/components/SeedSection";
import React from "react";
import OurBestSellingProducts from "@/components/OurBestSellingProducts";

const Home = () => {
  return (
    <div className="px-4 py-4 md:py-10 md:px-16 space-y-5 md:space-y-28">
      <Navbar />
      {/* <HeroSection /> */}
      <SeedSection />
      <OurNewProduct />
      <BestSpeciesPulses />
      <OurBestSellingProducts />
    </div>
  );
};

export default Home;
