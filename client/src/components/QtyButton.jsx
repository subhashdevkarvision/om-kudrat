import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

const QtyButton = ({ className }) => {
  return (
    <Button
      variant="outline"
      className={`rounded-full p-6 bg-[#EFEFEF] ${className}`}
    >
      <Minus size={24} className="text-text-green" />
      <span className="mx-5 text-xl font-semibold">1</span>
      <Plus size={24} className="text-text-green" />
    </Button>
  );
};

export default QtyButton;
