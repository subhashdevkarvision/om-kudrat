import React from "react";
import bestspecies from "../assets/bestspices.png";
import bestpulse from "../assets/bestpulse.png";
const BestSpeciesPulses = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-between">
      <img src={bestpulse} alt="" className="sm:w-[48%]" />
      <img src={bestspecies} className="sm:w-[48%]" alt="" />
    </div>
  );
};

export default BestSpeciesPulses;
