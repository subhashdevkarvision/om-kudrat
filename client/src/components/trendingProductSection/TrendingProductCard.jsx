import React from "react";
import { useNavigate } from "react-router";

const TrendingProductCard = ({ image, name, price, discountedPrice, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/products/${id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="flex gap-5 cursor-pointer items-center"
    >
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
        className="size-44"
        alt=""
      />
      <div>
        <p className="font-poppins font-medium text-lg text-Chinese-Black">
          {name}
        </p>
        <span className="text-grayish-blue text-xs line-through">${price}</span>
        <p className="font-poppins font-medium text-lg text-text-green">
          ${discountedPrice}
        </p>
      </div>
    </div>
  );
};

export default TrendingProductCard;
