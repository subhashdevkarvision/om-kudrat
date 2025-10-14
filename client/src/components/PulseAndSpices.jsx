import React from "react";
import IconBadgeGreen from "./IconsBadgeGreen";
import { Button } from "./ui/button";

const PulseAndSpices = () => {
  return (
    <div className="bg-[url('/public/composition2.png')] bg-cover bg-center bg-no-repeat h-[440px] rounded-4xl">
      <div className=" w-full flex flex-col justify-between h-full px-5 py-5 sm:py-10 sm:px-10 rounded-4xl">
        <div>
          <IconBadgeGreen title="Black Friday" className="" />
          <h3 className="font-belfast mt-2 mb-0.5 font-medium text-Chinese-Black text-5xl">
            Sale 50% OFF
          </h3>
          <p className="font-poppins font-normal text-3xl mt-4 text-Chinese-Black">
            All Pulses & Spices Products
          </p>
        </div>
        <Button
          variant="primary"
          className="w-fit rounded-full font-poppins font-medium py-5 px-8"
        >
          Discover Now
        </Button>
      </div>
    </div>
  );
};

export default PulseAndSpices;
