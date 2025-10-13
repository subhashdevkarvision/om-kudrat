import React from "react";
import customer1 from "../../assets/customer.jpg";
import customer2 from "../../assets/customer2.jpg";
import customer3 from "../../assets/customer3.jpg";

const Testimonial = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-5 lg:justify-between">
        <h4 className="font-belfast text-Chinese-Black text-4xl">
          Testimonial
        </h4>
        <p className="text-Black-Olive text-lg max-w-96">
          Made using clean, non-toxic ingredients, our products are designed for
          everyone.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="lg:w-[59%] bg-[#F8F6F1] rounded-2xl p-5">
          <p className="font-belfast font-normal text-xl md:text-2xl">
            “ I've been a loyal customer of Om Kudrat Pulses & Spices for over a
            year now, and I couldn't be happier with their products. The quality
            of their spices is unmatched, and the freshness is evident in every
            meal I prepare. ”
          </p>
          <div className="flex gap-5 items-center font-poppins mt-32">
            <img src={customer1} className="w-20 h-20 rounded-2xl" alt="" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-medium">Anjali Patel</span>
              <span>House Wife</span>
            </div>
          </div>
        </div>
        <div className="lg:w-[39%] bg-[#E3F6EA] rounded-2xl p-5">
          <img
            src={customer2}
            alt=""
            className="rounded-2xl w-full object-cover h-56"
          />
          <p className="text-xl md:text-2xl mt-5 mb-10">
            “ As a professional chef, Om Kudrat Pulses & Spices has consistently
            delivered top-notch products that meet my high standards. ”
          </p>
          <div className="flex flex-col">
            <span className="text-2xl font-medium">Rajesh Kumar</span>
            <span className="text-Black-Olive">Professional Chef</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
