import React, { useEffect, useState } from "react";
import IconBadgeGreen from "./IconsBadgeGreen";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import BestSellingProductCard from "./bestSellingProductCard";
import axios from "axios";
import { useNavigate } from "react-router";

const OurBestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/?isBestSeller=true`
      );
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <div>
        <IconBadgeGreen title={"Best Sellers"} />
      </div>
      <div className="flex flex-wrap mt-1 justify-between items-center gap-6 sm:gap-0">
        <h4 className="font-belfast text-Chinese-Black text-4xl">
          Our Best Selling Products
        </h4>

        <Button
          variant="outline"
          className="flex justify-between border-grayish-blue font-normal items-center py-5 rounded-full font-poppins text-Chinese-Black"
          onClick={() => navigate("/products")}
        >
          View All Products <MoveRight />
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-5 mt-10 md:gap-0 md:justify-between">
        {products.length > 0 ? (
          products.map((item) => (
            <BestSellingProductCard
              id={item._id}
              key={item._id}
              imgUrl={item.image}
              name={item.name}
              price={item.discountedPrice}
            />
          ))
        ) : (
          <p>No product found</p>
        )}
      </div>
    </div>
  );
};

export default OurBestSellingProducts;
