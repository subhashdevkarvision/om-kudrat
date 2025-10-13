// src/components/ProductCard.jsx
import { Heart } from "lucide-react";
import { MoveUpRight } from "lucide-react";
import { Button } from "./ui/button";
import product2 from "../assets/product2.png";

const BestSellingProductCard = () => {
  return (
    <div className="w-[250px] max-w-xs">
      <div className="relative rounded-xl bg-[#F8F8F8] w-[250px] max-w-xs h-52">
        <img src={product2} className="h-full w-full object-contain" alt="" />
        <Button variant="ghost" size="icon" className="absolute top-4 right-4">
          <Heart className="size-6 text-Chinese-Black" />
        </Button>
      </div>
      <div className="font-poppins">
        <div className="flex justify-between items-center">
          <p className="text-xl  font-medium">Caraway</p>
          <Button variant="ghost">
            <MoveUpRight className="size-6 text-Chinese-Black" />
          </Button>
        </div>
        <p className="text-xl text-text-green font-medium">$16.50</p>
      </div>
    </div>
  );
};

export default BestSellingProductCard;
