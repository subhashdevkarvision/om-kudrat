import React from "react";
import { Star } from "lucide-react";

const IconBadgeGreen = ({ title, className = "" }) => {
  return (
    <button
      className={`bg-white border font-poppins border-grayish-blue flex items-center gap-2 px-2 py-1.5 rounded-full ${className}`}
    >
      <Star fill="#018d43" size={10} className="text-text-green" />
      <p className="text-xs">{title}</p>
    </button>
  );
};

export default IconBadgeGreen;
