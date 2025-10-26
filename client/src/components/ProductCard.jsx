import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Heart, MoveUpRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/api";

const ProductCard = ({ id, image, title, price, isInWishlist }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/products/${id}`);
  };
  const queryClient = useQueryClient();

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(`/wishlist`, { productId: id });

      if (data.success) {
        queryClient.invalidateQueries(["userWishlist"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={handleClick} className="font-poppins">
      <div
        style={{
          backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}${image})`,
        }}
        className="relative rounded-2xl h-96 w-xs max-w-[300px] bg-cover bg-center bg-no-repeat"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlist}
          disabled={loading}
          className="absolute top-4 right-4"
        >
          <Heart
            className={`transition-all ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 right-4"
        >
          <MoveUpRight />
        </Button>
      </div>
      <div className="font-medium text-xl text-Chinese-Black my-2">{title}</div>
      <div className="font-medium text-xl text-text-green ">${price}</div>
    </div>
  );
};

export default ProductCard;
