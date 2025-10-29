import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

const SortComponent = ({
  sortOptionValues,
  sortOptionsArray,
  handleValuechange,
}) => {
  return (
    <Select
      value={sortOptionValues}
      onValueChange={handleValuechange}
      className="font-poppins"
    >
      <SelectTrigger className="border-none shadow-none bg-transparent focus:ring-0 focus:outline-none px-2 h-8 min-w-[120px] [&_svg.lucide-chevron-down]:bg-text-green [&_svg.lucide-chevron-down]:stroke-white [&_svg.lucide-chevron-down]:w-6 [&_svg.lucide-chevron-down]:h-6 [&_svg.lucide-chevron-down]:rounded-lg [&_svg.lucide-chevron-down]:p-1 [&_svg.lucide-chevron-down]:opacity-100">
        <span className="font-poppins text-lg text-gray-400">Sort By :</span>
        <span className="ml-2 font-poppins text-lg font-medium text-black">
          <SelectValue placeholder="Default" />
        </span>
      </SelectTrigger>
      <SelectContent>
        {sortOptionsArray.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="font-poppins"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortComponent;
