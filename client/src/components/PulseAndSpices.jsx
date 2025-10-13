import React from "react";
import IconBadgeGreen from "./IconsBadgeGreen";
import { Button } from "./ui/button";

const PulseAndSpices = () => {
  return (
    <div className="bg-[url('/public/composition2.png')] bg-cover bg-center bg-no-repeat h-80 rounded-4xl">
      <div className=" w-full h-full px-5 py-5 sm:py-10 sm:px-10 rounded-4xl">
        <IconBadgeGreen title="Black Friday" className="" />
        <h3 className="font-belfast mt-2 mb-0.5 font-normal text-Chinese-Black text-3xl">
          Sale 50% OFF
        </h3>
        <p className="font-poppins font-normal text-xl text-Chinese-Black">
          All Pulses & Spices Products
        </p>
        <Button
          variant="primary"
          className="w-auto rounded-full font-poppins font-medium mt-28"
        >
          Discover Now
        </Button>
      </div>
    </div>
  );
};

export default PulseAndSpices;
