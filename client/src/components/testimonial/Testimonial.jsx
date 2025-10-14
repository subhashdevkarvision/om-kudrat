import React from "react";
import customer1 from "../../assets/customer.jpg";
import customer2 from "../../assets/customer2.jpg";
import customer3 from "../../assets/customer3.jpg";
import { Button } from "../ui/button";

const Testimonial = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-5 md:justify-between">
        <h4 className="font-belfast text-Chinese-Black text-4xl">
          Testimonial
        </h4>
        <p className="text-Black-Olive text-lg max-w-96">
          Made using clean, non-toxic ingredients, our products are designed for
          everyone.
        </p>
      </div>
      <div className="flex flex-wrap lg:justify-between gap-3 mt-6">
        <div className="lg:w-[59%] flex flex-col gap-3 justify-between bg-[#F8F6F1] rounded-2xl p-5">
          <p className="font-belfast font-normal text-xl md:text-2xl lg:text-3xl">
            “ I've been a loyal customer of Om Kudrat Pulses & Spices for over a
            year now, and I couldn't be happier with their products. The quality
            of their spices is unmatched, and the freshness is evident in every
            meal I prepare. ”
          </p>
          <div className="flex gap-5 items-center font-poppins ">
            <img src={customer1} className="w-20 h-20 rounded-2xl" alt="" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-medium">Anjali Patel</span>
              <span>House Wife</span>
            </div>
          </div>
        </div>
        <div className="lg:w-[38%] flex flex-col gap-3 justify-between bg-[#E3F6EA] rounded-2xl p-5">
          <img
            src={customer2}
            alt=""
            className="rounded-2xl w-full object-cover h-56"
          />
          <p className="text-xl font-belfast md:text-2xl lg:text-3xl mt-5 mb-10">
            “ As a professional chef, Om Kudrat Pulses & Spices has consistently
            delivered top-notch products that meet my high standards. ”
          </p>
          <div className="flex flex-col">
            <span className="text-2xl font-medium">Rajesh Kumar</span>
            <span className="text-Black-Olive">Professional Chef</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap lg:justify-between gap-3 mt-6">
        <div className="lg:w-[74%]">
          <div className="flex flex-col md:flex-row md:justify-between bg-[#E1E7F8] p-5 rounded-2xl ">
            <div className="flex flex-col justify-between">
              <p className="text-xl font-belfast md:text-2xl lg:text-3xl mt-5 mb-10">
                "Om Kudrat Pulses & Spices has transformed my cooking. The
                difference in quality compared to other brands is incredible. ”
              </p>
              <div className="flex flex-col">
                <span className="text-2xl font-medium">Meera Singh</span>
                <span className="text-Black-Olive">House Wife</span>
              </div>
            </div>
            <img
              src={customer3}
              alt=""
              className="rounded-2xl md:w-1/5 object-cover"
            />
          </div>
        </div>
        <div className="w-full lg:w-[24%] bg-[#1C1A1F] p-10 gap-5 flex flex-col rounded-2xl justify-between">
          <p className="font-belfast text-2xl xl:text-3xl text-white">
            Explore Over Community
          </p>
          <Button
            variant="primary"
            className="rounded-full items-start w-fit px-5 text-white"
          >
            Join Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
