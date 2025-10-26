import React, { useEffect, useState } from "react";
import IconBadge from "./IconBadge";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { axiosInstance, fetchUserWishlist } from "@/api";
import { useQuery } from "@tanstack/react-query";

const OurNewProduct = () => {
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const { data } = useQuery({
    queryKey: ["userWishlist"],
    queryFn: fetchUserWishlist,
  });
  const fetchProductByCategory = async () => {
    const { data } = await axiosInstance.get(
      `/products${category ? `?category=${category}` : ""}`
    );
    if (data.success) {
      setProducts(data?.products);
    }
  };
  useEffect(() => {
    fetchProductByCategory();
  }, [category]);
  return (
    <div>
      <div>
        <IconBadge title={"Newly Made"} />
        <div className="flex flex-wrap mt-6 justify-between items-center gap-6 sm:gap-0">
          <h4 className="font-belfast text-Chinese-Black text-4xl">
            Our New Products
          </h4>
          <div className="flex">
            <Button
              variant={category == "" ? "primary" : "explore"}
              onClick={() => setCategory("")}
              className="rounded-full w-auto px-8 py-6"
            >
              All
            </Button>
            <Button
              variant={category == "Spices" ? "primary" : "explore"}
              onClick={() => setCategory("Spices")}
              className=" rounded-full w-auto px-8 py-6"
            >
              Spices
            </Button>
            <Button
              variant={category == "Pulses" ? "primary" : "explore"}
              onClick={() => setCategory("Pulses")}
              className=" rounded-full w-auto px-8 py-6"
            >
              Pulses
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-5 justify-center  gap-6 ">
        {products.length > 0 &&
          products.map((item) => {
            const isInWishlist = data?.wishlistData?.some(
              (w) => w.productId._id === item._id
            );

            return (
              <ProductCard
                key={item._id}
                id={item._id}
                image={item.image}
                title={item.name}
                price={item.discountedPrice}
                isInWishlist={isInWishlist}
              />
            );
          })}
      </div>
    </div>
  );
};

export default OurNewProduct;
