import React from "react";
import seedCenter from "../assets/seed-center.png";
import { BsDot } from "react-icons/bs";

const SeedSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8">
      <div className="flex-1 flex flex-col justify-center items-start">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 leading-tight">
          Organic <span className="text-text-green">Seeds </span> for Healthier
          Gardens
        </h2>
        <p className="mt-6 text-[#404040] ">
          Om Kudrat Seed & Spices, your ultimate destination for premium quality
          seeds and spices. Our e-commerce platform is designed to bring the
          rich flavors and health benefits of natural products straight to your
          doorstep.
        </p>
      </div>
      <div>
        <img src={seedCenter} alt="" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-start">
        <p className="text-gray-500 ">
          We pride ourselves on sourcing the finest seeds and spices, ensuring
          that each product meets the highest standards of purity and freshness.
          Whether you're a home cook looking to add a touch of authenticity to
          your dishes or a professional chef in search of exceptional
          ingredients, Om Kudrat has something for everyone
        </p>
      </div>
    </section>
  );
};

export default SeedSection;
