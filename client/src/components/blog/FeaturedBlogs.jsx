import React, { useEffect, useState } from "react";
import FilterHeader from "../fearturedProducts/FilterHeader";
import { axiosInstance, truncateString } from "@/api";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Button } from "../ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
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
        console.log("blogs", res.data);
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
      console.log(data);
    }
  };
  const getAllProducts = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/product/?isBestSeller=true&limit=4`
    );
    if (res.data.success) {
      console.log(res.data.products);
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
    <div className="flex flex-col sm:flex-row justify-between">
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
                  <div className="flex flex-col justify-between">
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
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              // navigation={{ prevEl: "#swiper-prev", nextEl: "#swiper-next" }}
              modules={[FreeMode, Navigation]}
              className="w-full rounded-2xl overflow-hidden  "
            >
              {bestSellingProducts.length &&
                bestSellingProducts.map((item) => (
                  <SwiperSlide key={item._d}>
                    <img
                      className="size"
                      src={`${import.meta.env.VITE_BACKEND_URL}${item.image}`}
                    ></img>
                    <p className="">{item.name}</p>
                    <p className="font-medium text-text-green">
                      {new Intl.NumberFormat("us-en", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.discountedPrice)}
                    </p>
                    {/* <Button
                      id="swiper-next"
                      className="swiper-button-next absolute !bottom-0 bg-white"
                    >
                      <ChevronRight />
                    </Button>
                    <Button
                      id="swiper-prev"
                      className="swiper-button-prev !bottom-0 absolute"
                    >
                      <ChevronLeft />
                    </Button> */}
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* right side  */}
      <div className="w-full sm:w-[58%] lg:w-[71%]">
        <div className="flex flex-wrap gap-3 mb-5 justify-between mt-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
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
