import React, { useEffect, useState } from "react";
import IconBadgeGreen from "../IconsBadgeGreen";
import TrendingProductCard from "./TrendingProductCard";
import { Button } from "../ui/button";
import { axiosInstance } from "@/api";
import { useNavigate } from "react-router";

const TrendingProducts = () => {
  const navigate = useNavigate();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [dealOfTheWeek, setDealOfTheWeek] = useState([]);
  const fetchTrandingProducts = async () => {
    const { data } = await axiosInstance.get("/best-selling");
    if (data.success) {
      setTrendingProducts(data.products);
    }
  };
  const fetchDealOfTheWeek = async () => {
    const { data } = await axiosInstance.get("/product?isDealOfTheWeek=true");
    if (data.success) {
      console.log("deal of the week", data.products[0]);
      setDealOfTheWeek(data.products[0]);
    }
  };
  const handleClick = (id) => {
    window.scrollTo(0, 0);
    navigate(`/products/${id}`);
  };
  useEffect(() => {
    fetchTrandingProducts();
    fetchDealOfTheWeek();
  }, []);
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-[70%]">
        <IconBadgeGreen title={"Recently Add"} />
        <h4 className="font-belfast text-Chinese-Black text-4xl">
          Trending Products
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {trendingProducts.length > 0 &&
            trendingProducts.map((item, id) => (
              <TrendingProductCard
                key={id}
                image={item.image}
                name={item.name}
                price={item.price}
                discountedPrice={item.discountedPrice}
                id={item._id}
              />
            ))}
        </div>
      </div>
      <div
        onClick={() => handleClick(dealOfTheWeek._id)}
        className="w-full lg:w-[30%] bg-text-green px-5 py-4 rounded-2xl flex flex-col items-center justify-center space-y-3 mt-6 md:mt-0"
      >
        <h5 className="font-belfast text-2xl text-white">Deal Of The Week</h5>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${dealOfTheWeek.image}`}
          className="rounded-2xl w-56 h-48 lg:w-full lg:h-full"
          alt=""
        />
        <div className="text-center font-poppins">
          <p className=" font-medium text-lg text-white">
            {dealOfTheWeek.name}
          </p>
          <span className="line-through text-xs text-grayish-blue">
            ${dealOfTheWeek.price}
          </span>
          <p className=" font-medium text-lg text-white">
            ${dealOfTheWeek.discountedPrice}
          </p>
        </div>
        <Button
          variant="primary"
          className="bg-white font-medium hover:bg-white text-Chinese-Black rounded-full text-base px-8 py-5 w-auto"
        >
          Discover Now
        </Button>
      </div>
    </div>
  );
};

export default TrendingProducts;
