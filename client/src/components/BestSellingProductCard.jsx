import { Heart } from "lucide-react";
import { MoveUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "@/api";

const BestSellingProductCard = ({ imgUrl, name, price, id, isInWishlist }) => {
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
    <div className="w-[250px] cursor-pointer max-w-xs" onClick={handleClick}>
      <div className="relative rounded-xl bg-[#F8F8F8] w-[250px] max-w-xs h-52">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${imgUrl}`}
          className="h-full w-full object-contain"
          alt=""
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={handleWishlist}
          disabled={loading}
        >
          <Heart
            className={`transition-all size-6 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-Chinese-Black"
            }`}
          />
        </Button>
      </div>
      <div className="font-poppins">
        <div className="flex justify-between items-center">
          <p className="text-xl  font-medium">{name}</p>
          <Button variant="ghost">
            <MoveUpRight className="size-6 text-Chinese-Black" />
          </Button>
        </div>
        <p className="text-xl text-text-green font-medium">${price}</p>
      </div>
    </div>
  );
};

export default BestSellingProductCard;
