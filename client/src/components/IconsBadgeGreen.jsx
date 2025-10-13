import React from "react";
import { Star } from "lucide-react";

const IconBadgeGreen = ({ title }) => {
  return (
    <button className="bg-white border font-poppins border-grayish-blue flex items-center gap-2 px-2 py-1.5 rounded-full">
      <Star fill="#018d43" size={20} className="text-text-green" />
      <p className="text-sm">{title}</p>
    </button>
  );
};

export default IconBadgeGreen;
