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
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categoriesProducts, setCategoriesProducts] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [priceRange, setPriceRange] = useState([10, 100]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

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
      res.data.filters[0].categories.map((category) => {
        filterCategoriesProducts.push(category);
      });

      setLanguages(res.data.filters[0].languages);
      setCategoriesProducts(filterCategoriesProducts);
    }
  };
  const queryParams = () => {
    const params = new URLSearchParams();
    if (selectedProductIds.length) {
      params.append("ids", selectedProductIds.join(","));
    }
    if (selectedLanguage) {
      params.append("language", selectedLanguage.join(","));
    }
    if (priceRange[0] !== null) {
      params.append("minPrice", priceRange[0]);
    }
    if (priceRange[1] !== null) {
      params.append("maxPrice", priceRange[1]);
    }
    if (searchTerm) {
      params.append("searchTerm", searchTerm);
    }
    if (sortOption && sortOption !== "default") {
      params.append("sort", sortOption);
    }
    if (page) {
      params.append("page", page);
    }
    return params.toString();
  };
  const getAllProducts = async () => {
    const query = queryParams();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/?${query}`
      );
      if (res.data.success) {
        setProducts(res.data.products);
        if (res.data.totalPages) {
          setTotalPages(res.data.totalPages);
        }
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setProducts([]);
      setTotalPages(1);
    }
  };
  const toggleProductId = (productId) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    filters();
  }, []);
  useEffect(() => {
    getAllProducts();
  }, [priceRange, selectedLanguage, selectedProductIds, sortOption, page]);
  return (
    <div className="flex flex-col sm:flex-row justify-between">
      {/* filter section */}
      <div
        className={`w-full flex flex-col space-y-10 ${
          isFilterOpen ? "block" : "hidden"
        } sm:flex sm:w-[38%] lg:w-[27%]`}
      >
        {/* search */}
        <div>
          <FilterHeader title="Search" />
          <div className="flex items-center">
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              className="rounded-full bg-Light-Silver h-[50px] text-Black-Olive placeholder:text-Black-Olive"
              placeholder="Search Products"
            />
            <Button
              variant="outline"
              className=" py-6  border-grayish-blue rounded-full"
              onClick={() => getAllProducts()}
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
                  <AccordionTrigger className="text-base font-normal py-4 px-2 border-b hover:no-underline [&[data-state=open]>svg]:rotate-180 [&>svg]:border [&>svg]:rounded-sm justify-between">
                    {item.categoryName}
                  </AccordionTrigger>
                  <AccordionContent className="pl-2 pr-4 text-Gray91">
                    {item.products.map((option, index) => (
                      <label
                        key={index}
                        className="flex border-Gray91 rounded-2xl items-center py-2"
                      >
                        <Checkbox
                          checked={selectedProductIds.includes(option._id)}
                          onCheckedChange={() => toggleProductId(option._id)}
                          className="data-[state=checked]:bg-text-green data-[state=checked]:border-text-green w-5 h-5 mr-3 rounded border-gray-400"
                        />
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
            {languages.map((option, id) => (
              <label
                key={id}
                className="flex text-Gray91 border-Gray91 rounded-2xl items-center py-2"
              >
                <Checkbox
                  checked={selectedLanguage.includes(option.id)}
                  onCheckedChange={(checked) => {
                    setSelectedLanguage((prev) =>
                      checked
                        ? [...prev, option.id]
                        : prev.filter((id) => id !== option.id)
                    );
                  }}
                  className="data-[state=checked]:bg-text-green data-[state=checked]:border-text-green w-5 h-5 mr-3 rounded border-gray-400"
                />
                <span className="text-sm  flex-1">{option.name}</span>
                <span className="text-sm ml-2">(12)</span>
              </label>
            ))}
          </div>
        </div>
        {/* Filter BY Price */}
        <div>
          <FilterHeader title="Filter By Price" />
          <div className="w-full mt-5 flex flex-col items-center px-2">
            <Slider
              min={10}
              max={100}
              step={10}
              value={priceRange}
              onValueChange={(v) => setPriceRange(v)}
              className="w-full [&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-Light-Silver [&_[data-slot=slider-range]]:bg-text-green [&_[data-slot=slider-range]]:h-1.5 [&_[data-slot=slider-thumb]]:w-7 [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:bg-text-green [&_[data-slot=slider-thumb]]:border-none [&_[data-slot=slider-thumb]]:shadow-none"
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
      <div className="w-full sm:w-[58%] lg:w-[71%]">
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
            <Select
              value={sortOption}
              onValueChange={(value) => setSortOption(value)}
              className="font-poppins"
            >
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
                    className="font-poppins"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* card main section */}
        <div className="flex flex-col space-y-5">
          <div className="flex gap-x-2 gap-y-8 flex-wrap justify-center lg:justify-start lg:gap-x-6">
            {products.length > 0 ? (
              products.map((product) => (
                <FeartureProductCard
                  id={product._id}
                  key={product._id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  discountedPrice={product.discountedPrice}
                />
              ))
            ) : (
              <span className="">No Products Found</span>
            )}
          </div>

          {/* pagination */}
          <div className="flex justify-start">
            <PaginationComponent
              currentPage={page}
              onpageChange={(page) => setPage(page)}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeartureProductSection;
