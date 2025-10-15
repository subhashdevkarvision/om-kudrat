import React from "react";
import { Button } from "../ui/button";

const ExclusiveOffers = () => {
  return (
    <div className="bg-[url('/exclusive.png')] h-[440px] bg-center p-5 bg-cover flex flex-col justify-center items-center rounded-4xl space-y-5">
      <h3 className="font-belfast text-4xl text-center">
        Stay Up to Date with All News <br /> and Exclusive Offers
      </h3>
      <div className="flex flex-wrap justify-center sm:justify-between items-center sm:gap-36 rounded-full bg-[#0000004D] py-2 px-2 ">
        <input
          placeholder="Enter your email address"
          className="px-2 sm:px-5 text-lg border-none outline-none rounded-none text-white"
        ></input>
        <Button
          variant="outline"
          to="/register"
          className="px-5 py-5 rounded-full bg-white text-black"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default ExclusiveOffers;
