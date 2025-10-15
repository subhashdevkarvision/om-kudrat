import React from "react";
import IconBadge from "./IconBadge";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

const OurNewProduct = () => {
  return (
    <div>
      <div>
        <IconBadge title={"Newly Made"} />
        <div className="flex flex-wrap mt-6 justify-between items-center gap-6 sm:gap-0">
          <h4 className="font-belfast text-Chinese-Black text-4xl">
            Our New Products
          </h4>
          <div className="flex">
            <Button variant="primary" className="rounded-full w-auto px-8 py-6">
              All
            </Button>
            <Button variant="explore" className=" py-6">
              Spices
            </Button>
            <Button variant="explore" className=" py-6">
              Pulses
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-5 justify-center sm:justify-between gap-6 sm:gap-6 ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default OurNewProduct;
