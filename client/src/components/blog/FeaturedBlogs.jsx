import React, { useCallback, useEffect, useState } from "react";
import FilterHeader from "../fearturedProducts/FilterHeader";
import { axiosInstance, truncateString } from "@/api";
import axios from "axios";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PaginationComponent from "../fearturedProducts/PaginationComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router";
import useEmblaCarousel from "embla-carousel-react";

const FeaturedBlogs = () => {
  const [recentblog, setRecentBlog] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const sortOptions = [
    { label: "Default", value: "default" },
    { label: "A to Z", value: "a-z" },
    { label: "Z to A", value: "z-a" },
    { label: "Newest", value: "newest" },
  ];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const queryParams = () => {
    const params = new URLSearchParams();
    if (sortOption && sortOption !== "default") {
      params.append("sort", sortOption);
    }
    if (page) {
      params.append("page", page);
    }
    return params.toString();
  };
  const getAllBlogs = async () => {
    const query = queryParams();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blog/?${query}`
      );
      if (res.data.success) {
        setBlogs(res.data.data);
        if (res.data.pagination.pages) {
          setTotalPages(res?.data?.pagination?.pages);
        }
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setBlogs([]);
      setTotalPages(1);
    }
  };
  const getRecentBlog = async () => {
    const { data } = await axiosInstance.get("/blog?sort=latest&limit=3");
    if (data.success) {
      setRecentBlog(data?.data);
    }
  };
  const getAllProducts = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/product/?isBestSeller=true&limit=4`
    );
    if (res.data.success) {
      setBestSellingProducts(res.data.products);
    }
  };
  useEffect(() => {
    getRecentBlog();
    getAllProducts();
  }, []);
  useEffect(() => {
    getAllBlogs();
  }, [sortOption, page]);
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-9">
      {/* left side  */}
      <div className="sm:flex sm:w-[38%] lg:w-[27%] w-full flex flex-col space-y-7">
        {/* recent articles */}
        <div className="space-y-5">
          <FilterHeader title="Recent Articles" />
          <div className="space-y-4">
            {recentblog.length &&
              recentblog.map((item) => (
                <div
                  onClick={() => navigate(`/blog/${item._id}`)}
                  key={item._id}
                  className="space-x-5 flex"
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${item.image}`}
                    className="rounded-sm size-16 cursor-pointer"
                    alt={item.title}
                  />
                  <div className="flex flex-col md:justify-between">
                    <h3 className="text-Chinese-Black font-medium">
                      {item.title}
                    </h3>
                    <p className="text-Black-Olive text-sm">
                      {truncateString(item.shortDescription, 40)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* tags  */}
        <div className="space-y-5">
          <FilterHeader title="Tags" />
          <ul className="space-y-2.5">
            <li className="text-Black-Olive text-sm ml-5">Flavour Spices</li>
            <li className="text-Black-Olive text-sm ml-5">Garam</li>
            <li className="text-Black-Olive text-sm ml-5">Masala Powder</li>
            <li className="text-Black-Olive text-sm ml-5">Pulses</li>
            <li className="text-Black-Olive text-sm ml-5">Pulses Powder</li>
          </ul>
        </div>
        {/* best seller  */}
        <div className="space-y-5">
          <FilterHeader title="Best Seller" />

          <div>
            <div className="overflow-hidden relative sm:w-[310px] max-w-full">
              <div className="overflow-hidden w-full" ref={emblaRef}>
                <div className="flex select-none gap-2">
                  {bestSellingProducts.length &&
                    bestSellingProducts.map((item) => (
                      <div
                        className="relative min-w-[100%] space-y-5"
                        key={item._id}
                      >
                        <img
                          className="w-full h-[350px] sm:w-[310px] sm:h-[196px]"
                          src={`${import.meta.env.VITE_BACKEND_URL}${
                            item.image
                          }`}
                          onClick={() => navigate(`/products/${item._id}`)}
                        ></img>
                        <div className="pr-1">
                          <p className="">{item.name}</p>
                          <p className="font-medium text-text-green">
                            {new Intl.NumberFormat("us-en", {
                              style: "currency",
                              currency: "USD",
                            }).format(item.discountedPrice)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="absolute bottom-0 right-0">
                <Button
                  variant="outline"
                  className=" hover:bg-text-green hover:text-white  py-6  border-grayish-blue   rounded-full "
                  onClick={scrollPrev}
                >
                  <ChevronLeft size={20} className="mx-1.5" />
                </Button>
                <Button
                  variant="outline"
                  className=" hover:bg-text-green hover:text-white   py-6 border-grayish-blue rounded-full   "
                  onClick={scrollNext}
                >
                  <ChevronRight size={20} className="mx-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* right side  */}
      <div className="w-full sm:w-[58%] lg:w-[71%]">
        <div className="flex flex-wrap gap-3 mb-5 justify-between">
          <h5 className="text-2xl text-Chinese-Black font-belfast">
            Featured Products
          </h5>
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
        {/* blogs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-7">
          {blogs.length > 0 ? (
            blogs.map((b) => (
              <BlogCard
                width="w-[304px]"
                heigth="h-[220px]"
                id={b._id}
                title={b.title}
                description={truncateString(b.shortDescription, 60)}
                image={b.image}
                key={b._id}
              />
            ))
          ) : (
            <p className="text-center text-3xl">No blog found </p>
          )}
        </div>
        <div className="flex justify-start mt-10">
          <PaginationComponent
            currentPage={page}
            onpageChange={(page) => setPage(page)}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
