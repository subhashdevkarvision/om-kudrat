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
import { Package, Truck, MessagesSquare, CreditCard } from "lucide-react";
import FromOurBlog from "@/components/blog/FromOurBlog";

const Home = () => {
  const features = [
    {
      icon: <Package className="text-text-green" size={30} />,
      title: "Free Shipping",
      subtitle: "Free Shipping for order over $130.",
    },
    {
      icon: <Truck className="text-text-green" size={30} />,
      title: "Returns",
      subtitle: "Within 30 days for an exchanges.",
    },
    {
      icon: <MessagesSquare className="text-text-green" size={30} />,
      title: "Online Support",
      subtitle: "24 Hours a day, 7 Days a week",
    },
    {
      icon: <CreditCard className="text-text-green" size={30} />,
      title: "Flexible Payment",
      subtitle: "Pay with Multiple Credit cards",
    },
  ];
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
      <FromOurBlog />
      <ServiceHighlights FEATURES={features} />
      <ExclusiveOffers />
    </div>
  );
};

export default Home;
