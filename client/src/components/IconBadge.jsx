import React from "react";
import { Star } from "lucide-react";

const IconBadge = ({ title }) => {
  return (
    <button className="bg-white border font-poppins border-grayish-blue flex items-center gap-2 px-2 py-1.5 rounded-full">
      <Star fill="#d4eee3" size={20} className="text-Chinese-White" />
      <p className="text-sm">{title}</p>
    </button>
  );
};

export default IconBadge;
