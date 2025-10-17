import React from "react";
// import product from "../../assets/product1.png";

const FeartureProductCard = ({ image, name, price, discountedPrice }) => {
  return (
    <div className="relative">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
        className="size-[280px] rounded-3xl"
        alt=""
      />
      <div className="rounded-full absolute top-4 left-4 bg-[#FD7745] text-white text-[10px] py-3.5 px-2">
        SALE !
      </div>
      <div className="mt-5">
        <h5 className=" font-medium text-xl text-Chinese-Black">{name}</h5>
        <span className="line-through text-xs text-grayish-blue">${price}</span>
        <p className="text-lg font-medium text-text-green">
          ${discountedPrice}
        </p>
      </div>
    </div>
  );
};

export default FeartureProductCard;
