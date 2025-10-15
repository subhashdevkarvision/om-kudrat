import { Heart } from "lucide-react";
import { MoveUpRight } from "lucide-react";
import { Button } from "./ui/button";

const ProductCard = ({ title, price }) => (
  <div className="font-poppins">
    <div className="bg-[url('/product1.png')] relative rounded-2xl h-96  bg-cover bg-center w-xs max-w-[300px] bg-no-repeat">
      <Button variant="ghost" size="icon" className="absolute top-4 right-4">
        <Heart />
      </Button>
      <Button variant="ghost" size="icon" className="absolute bottom-4 right-4">
        <MoveUpRight />
      </Button>
    </div>
    <div className="font-medium text-xl text-Chinese-Black my-2">
      {title || "Yuvika Anesu Asli"}
    </div>
    <div className="font-medium text-xl text-text-green ">
      ${price || "30.00"}
    </div>
  </div>
);

export default ProductCard;
