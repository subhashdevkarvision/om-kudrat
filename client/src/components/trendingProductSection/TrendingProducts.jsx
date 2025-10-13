import React from "react";
import IconBadgeGreen from "../IconsBadgeGreen";
import TrendingProductCard from "./TrendingProductCard";
import product4 from "../../assets/product4.png";
import { Button } from "../ui/button";

const TrendingProducts = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-[70%]">
        <IconBadgeGreen title={"Recently Add"} />
        <h4 className="font-belfast text-Chinese-Black text-4xl">
          Trending Products
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <TrendingProductCard />
          <TrendingProductCard />
          <TrendingProductCard />
          <TrendingProductCard />
        </div>
      </div>
      <div className="w-full lg:w-[30%] bg-text-green px-5 py-4 rounded-2xl flex flex-col items-center justify-center space-y-3 mt-6 md:mt-0">
        <h5 className="font-belfast text-xl text-white">Deal Of The Week</h5>
        <img
          src={product4}
          className="rounded-2xl w-56 h-48 lg:w-full lg:h-full"
          alt=""
        />
        <div className="text-center">
          <p className="font-poppins font-medium text-sm text-white">
            Barberry
          </p>
          <span className="line-through text-xs text-grayish-blue">$34.60</span>
          <p className="font-poppins font-medium text-sm text-white">$24.60</p>
        </div>
        <Button
          variant="primary"
          className="bg-white text-Chinese-Black rounded-full text-sm px-8 py-5 w-auto"
        >
          Discover Now
        </Button>
      </div>
    </div>
  );
};

export default TrendingProducts;
