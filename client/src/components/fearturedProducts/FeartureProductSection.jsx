import React from "react";
import FeartureProductCard from "./FeartureProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChevronDown } from "lucide-react";

const FeartureProductSection = () => {
  const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Price: Low to High", value: "low-high" },
    { label: "Price: High to Low", value: "high-low" },
    { label: "Newest", value: "newest" },
  ];
  return (
    <div>
      <div>filter</div>
      <div>
        <div>
          <h5 className="text-2xl text-Chinese-Black font-belfast">
            Featured Products
          </h5>
          <div>
            <p className="text-sm">Sort By : </p>
            <p>{}</p>
            <Select className="">
              <SelectTrigger>
                <ChevronDown />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
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
          </div>
        </div>
      </div>
      <FeartureProductCard />
    </div>
  );
};

export default FeartureProductSection;
