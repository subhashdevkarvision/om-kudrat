import { Heart } from "lucide-react";
import { MoveUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

const BestSellingProductCard = ({ imgUrl, name, price, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/products/${id}`);
  };
  return (
    <div className="w-[250px] max-w-xs" onClick={handleClick}>
      <div className="relative rounded-xl bg-[#F8F8F8] w-[250px] max-w-xs h-52">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${imgUrl}`}
          className="h-full w-full object-contain"
          alt=""
        />
        <Button variant="ghost" size="icon" className="absolute top-4 right-4">
          <Heart className="size-6 text-Chinese-Black" />
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
