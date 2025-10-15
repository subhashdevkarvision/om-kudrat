import React from "react";
import product from "../../assets/product1.png";

const FeartureProductCard = () => {
  return (
    <div className="relative">
      <img src={product} className="size-[304px] rounded-3xl" alt="" />
      <div className="rounded-full absolute top-4 left-4 bg-[#FD7745] text-white text-[10px] py-4 px-2">
        SALE !
      </div>
      <div className="font-poppins">
        <h5 className=" font-medium text-xl text-Chinese-Black">
          Yuvika Anesu Asli
        </h5>
        <span className="line-through text-xs text-grayish-blue">$20.50</span>
        <p className="text-lg font-medium text-text-green">$16.50</p>
      </div>
    </div>
  );
};

export default FeartureProductCard;
