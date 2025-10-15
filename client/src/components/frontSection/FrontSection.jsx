import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

const FrontSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="bg-[url('/product-header.jpg')] bg-cover rounded-3xl md:bg-center h-[400px] sm:h-[300px]"></div>
      <div className="font-belfast bg-white rounded-tr-2xl pr-5 pt-2   bottom-0 left-0 absolute">
        <p className="text-4xl text-Chinese-Black">Products</p>
        <div className="flex items-center gap-2">
          <span onClick={() => navigate("/")}>Home</span> <span>&gt;</span>{" "}
          <span>Products</span>
        </div>
      </div>
    </div>
  );
};

export default FrontSection;
