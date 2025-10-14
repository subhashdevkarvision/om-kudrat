import React from "react";
import product3 from "../../assets/product3.png";

const TrendingProductCard = () => {
  return (
    <div className="flex gap-5 items-center">
      <img src={product3} className="size-44" alt="" />
      <div>
        <p className="font-poppins font-medium text-lg text-Chinese-Black">
          White Musterd
        </p>
        <span className="text-grayish-blue text-xs line-through">$20.50</span>
        <p className="font-poppins font-medium text-lg text-text-green">
          $16.50
        </p>
      </div>
    </div>
  );
};

export default TrendingProductCard;
