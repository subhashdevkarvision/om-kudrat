import React from "react";
import bestspecies from "../assets/bestspices.png";
import bestpulse from "../assets/bestpulse.png";
const BestSpeciesPulses = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-between">
      <img src={bestpulse} alt="" className="sm:w-[48%]" />
      <img src={bestspecies} className="sm:w-[48%]" alt="" />
    </div>
    // <div className="flex flex-col justify-center items-center  font-belfast text-white ">
    //   <p className="rounded-t-xl font-poppins  bg-[#16161699] text-center text-sm w-20">
    //     organic
    //   </p>

    //   <p className="rounded-full py-1 border-0 bg-[#16161699] text-center text-xl inline-block w-36">
    //     Best Species
    //   </p>
    //   <p className="rounded-b-xl  bg-[#16161699] text-center text-xl inline-block w-20">
    //     Blends
    //   </p>
    // </div>
  );
};

export default BestSpeciesPulses;
