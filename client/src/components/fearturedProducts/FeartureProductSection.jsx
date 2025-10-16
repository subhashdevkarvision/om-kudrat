import React, { useEffect, useState } from "react";
import FeartureProductCard from "./FeartureProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import FilterHeader from "./FilterHeader";
import { Slider } from "../ui/slider";
import PaginationComponent from "./PaginationComponent";
import axios from "axios";

const FeartureProductSection = () => {
  const [price, setPrice] = useState([40]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categoriesProducts, setCategoriesProducts] = useState([]);
  const [languages, setLanguages] = useState([]);
  const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Price: Low to High", value: "low-high" },
    { label: "Price: High to Low", value: "high-low" },
    { label: "Newest", value: "newest" },
  ];

  const filters = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/product/filters`
    );
    if (res.data.success) {
      const filterCategoriesProducts = [];
      const filterLanguages = [];
      res.data.filters[0].categories.map((category) => {
        filterCategoriesProducts.push(category);
      });
      res.data.filters[0].languages.map((language) => {
        filterLanguages.push(language.name);
      });
      setLanguages(filterLanguages);
      setCategoriesProducts(filterCategoriesProducts);
      console.log(filterLanguages);
    }
  };
  useEffect(() => {
    filters();
  }, []);
  return (
    <div className="flex flex-col sm:flex-row justify-between">
      {/* filter section */}
      <div
        className={`w-full flex flex-col space-y-10 ${
          isFilterOpen ? "block" : "hidden"
        } sm:flex sm:w-[29%]`}
      >
        {/* search */}
        <div>
          <FilterHeader title="Search" />
          <div className="flex items-center">
            <Input
              className="rounded-full bg-Light-Silver h-[50px] text-Black-Olive placeholder:text-Black-Olive"
              placeholder="Search Products"
            />
            <Button
              variant="outline"
              className=" py-6  border-grayish-blue rounded-full"
            >
              <Search size={20} className="mx-1" />
            </Button>
          </div>
        </div>
        {/* caegories */}
        <div>
          <FilterHeader title="Categories" />
          {/* accordian */}
          <Accordion type="single" collapsible>
            {categoriesProducts &&
              categoriesProducts.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={item.categoryName}
                  className="border-none"
                >
                  <AccordionTrigger className="text-base font-normal py-4 px-2 border-b hover:no-underline [&[data-state=open]>svg]:rotate-180 justify-between">
                    {item.categoryName}
                  </AccordionTrigger>
                  <AccordionContent className="pl-2 pr-4 text-Gray91">
                    {item.products.map((option, index) => (
                      <label
                        key={index}
                        className="flex border-Gray91 rounded-2xl items-center py-2"
                      >
                        <Checkbox className="data-[state=checked]:bg-text-green data-[state=checked]:border-text-green w-5 h-5 mr-3 rounded border-gray-400" />
                        <span className="text-sm  flex-1">{option.name}</span>
                        <span className="text-sm ml-2">(1)</span>
                      </label>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
        {/* languages */}
        <div>
          <FilterHeader title="Language" />
          <div className="pt-0 pb-4 pl-2 pr-4">
            {languages.map((option) => (
              <label
                key={option}
                className="flex text-Gray91 border-Gray91 rounded-2xl items-center py-2"
              >
                <Checkbox className="data-[state=checked]:bg-text-green data-[state=checked]:border-text-green w-5 h-5 mr-3 rounded border-gray-400" />
                <span className="text-sm  flex-1">{option}</span>
                <span className="text-sm ml-2">(12)</span>
              </label>
            ))}
          </div>
        </div>
        {/* Filter BY Price */}
        <div>
          <FilterHeader title="Filter BY Price" />
          <div className="w-full mt-4 flex flex-col items-center px-2">
            <Slider
              min={10}
              max={100}
              step={1}
              value={price}
              onValueChange={(e) => setPrice(e.target.value)}
              className="w-full [&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-Light-Silver [&_[data-slot=slider-range]]:bg-green-600 [&_[data-slot=slider-range]]:h-1.5 [&_[data-slot=slider-thumb]]:w-7 [&_[data-slot=slider-thumb]]:h-7 [&_[data-slot=slider-thumb]]:bg-green-600 [&_[data-slot=slider-thumb]]:border-none [&_[data-slot=slider-thumb]]:shadow-none"
            />
            <div className="w-full mt-4 flex items-center justify-between mb-2">
              <span className="text-lg font-belfast text-Chinese-Black">
                {10}$
              </span>
              <span className="text-lg font-belfast text-Chinese-Black">
                {100}$
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* fearture product section */}
      <div className="w-full sm:w-[68%]">
        <div className="flex flex-wrap gap-3 mb-5 justify-between">
          <h5 className="text-2xl text-Chinese-Black font-belfast">
            Featured Products
          </h5>
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="sm:hidden"
          >
            Filters
          </Button>
          <div>
            <Select>
              <SelectTrigger className="border-none shadow-none bg-transparent focus:ring-0 focus:outline-none px-2 h-8 min-w-[120px] [&_svg.lucide-chevron-down]:bg-text-green [&_svg.lucide-chevron-down]:stroke-white [&_svg.lucide-chevron-down]:w-6 [&_svg.lucide-chevron-down]:h-6 [&_svg.lucide-chevron-down]:rounded-lg [&_svg.lucide-chevron-down]:p-1 [&_svg.lucide-chevron-down]:opacity-100">
                <span className="font-poppins text-lg text-gray-400">
                  Sort By :
                </span>
                <span className="ml-2 font-poppins text-lg font-medium text-black">
                  <SelectValue placeholder="Default" />
                </span>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className=""
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* card main section */}
        <div>
          <FeartureProductCard />
          {/* pagination */}
          <div className="flex- justify-start">
            <PaginationComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeartureProductSection;
