import FrontSection from "@/components/frontSection/FrontSection";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Heart, Minus, Share2 } from "lucide-react";
import img1 from "../assets/product1.png";
import img2 from "../assets/product2.png";
import img3 from "../assets/product3.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OurBestSellingProducts from "@/components/OurBestSellingProducts";
import axios from "axios";
import { useParams } from "react-router";
import QtyButton from "@/components/QtyButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  addToWishlist,
  fetchUserCart,
  fetchUserWishlist,
} from "@/api";
import { toast } from "sonner";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["userCart"],
    queryFn: fetchUserCart,
  });
  const wishList = useQuery({
    queryKey: ["userWishlist"],
    queryFn: fetchUserWishlist,
  });
  const isProductAddedInWishlist = wishList?.data?.wishlistData?.some(
    (item) => item.productId._id === id
  );

  const userCartItems = data?.cartData?.length > 0 ? data.cartData : [];
  const cartProduct = userCartItems.find((item) => item.productId._id === id);
  const isProductAdded = userCartItems.some(
    (item) => item.productId._id === id
  );
  console.log(isProductAdded);
  const fetchProduct = async (param) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/product/${param}`
    );
    if (res.data.success) {
      setProduct(res.data.data);
    }
  };

  const queryClient = useQueryClient();
  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["userCart"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
  const addToWishlistMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["userWishlist"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
  useEffect(() => {
    fetchProduct(id);
  }, []);
  return (
    <div className="space-y-20 md:space-y-28">
      <FrontSection
        title="Products"
        path="Home"
        subPath="Products"
        imgUrl="/product-header-img2.png"
      />
      {product ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 justify-between">
          <div>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
              className="w-full"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-belfast text-4xl text-Chinese-Black mb-5">
                {product.name}
              </h2>
              <p className="mb-4">
                <span className="text-text-green text-3xl font-semibold mr-4">
                  ${product.discountedPrice}
                </span>
                <span className="text-grayish-blue text-base line-through">
                  ${product.price}
                </span>
              </p>
              <p className="text-sm text-Black-Olive leading-[1.4] mb-10">
                Add an extra dose of style with this raw look henley t-shirt
                from the house of Tinted. Team this T-shirt with distressed
                jeans and leather sandals for a relaxed and...
              </p>
              <div className="flex items-center">
                <QtyButton
                  className={`p-1.5 ${!isProductAdded ? "hidden" : "block"}`}
                  id={product._id}
                  qty={cartProduct?.qty || 1}
                />
                <Button
                  variant="primary"
                  onClick={() => addToCartMutation.mutate(id)}
                  className="w-fit p-6 rounded-full cursor-pointer"
                  disabled={isProductAdded}
                >
                  Add to cart
                </Button>
              </div>
              <div className="flex items-center mt-4">
                <Button
                  variant="outline"
                  className="rounded-full p-5 items-center "
                  onClick={() => addToWishlistMutation.mutate(id)}
                >
                  <span className="text-base font-normal text-Black-Olive mr-12">
                    {isProductAddedInWishlist
                      ? "Remove from wishlist"
                      : "Add to wishlist"}
                  </span>
                  <Heart
                    size={24}
                    fill={isProductAddedInWishlist ? "#018d43" : "#ffffff"}
                    className="text-text-green"
                  />
                </Button>
                <Button variant="ghost" className="">
                  <Share2 size={20} />
                </Button>
              </div>
              <p className="font-semibold text-sm text-Chinese-Black mt-7">
                Category{" "}
                <span className="text-Black-Olive font-normal ml-2">
                  {product?.categoryId?.name}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap gap-5 mt-2.5">
              <img src={img1} className="size-28 rounded-2xl" alt="" />
              <img src={img2} className="size-28 rounded-2xl" alt="" />
              <img src={img3} className="size-28 rounded-2xl" alt="" />
            </div>
          </div>
        </div>
      ) : (
        <p>No product found</p>
      )}
      {/* tabs menu */}
      <div className="rounded-2xl bg-[#F5F5F5] border border-[#BFC2CC] shadow-lg ">
        <Tabs defaultValue="description">
          <TabsList className="bg-black rounded-t-2xl rounded-b-none flex flex-col sm:flex-row gap-4 px-2 py-0 h-full justify-center w-full">
            <TabsTrigger
              value="description"
              className="font-belfast font-normal text-sm "
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="additional"
              className="font-belfast font-normal text-sm"
            >
              Additional Information
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="font-belfast font-normal text-sm "
            >
              Review
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <ul className="list-disc p-10 space-y-8">
              <li>
                Add an extra dose of style with this raw look henley t-shirt
                from the house of Tinted. Team this T-shirt with distressed
                jeans and leather sandals for a relaxed and cool look.Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry.
              </li>
              <li>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s.Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release, and more recently
                with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </li>
              <li>
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="additional">
            <ul className="list-disc p-10 space-y-6">
              <li>
                Material: 100% premium cotton with soft, breathable texture for
                all-day comfort.
              </li>
              <li>
                Fit Type: Regular fit with enhanced stretch for easy movement.
              </li>
              <li>
                Care Instructions: Machine wash cold with similar colors. Do not
                bleach. Tumble dry low.
              </li>
              <li>
                Origin: Designed in California, crafted responsibly in India.
              </li>
              <li>Available Sizes: S, M, L, XL, XXL.</li>
              <li>Colors: Olive Green, Deep Black, Grey Mist.</li>
              <li>
                Ideal For: Casual outings, daily wear, or weekend style
                upgrades.
              </li>
              <li>
                Warranty: 6-month stitching warranty against manufacturing
                defects.
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="review">
            <div className="p-10 space-y-6">
              <div className="border-b border-gray-700 pb-4">
                <h4 className="font-semibold text-lg text-black">John Doe</h4>
                <p className="text-sm text-black mb-1">Rated: ★★★★☆</p>
                <p className="text-black text-sm">
                  The material feels premium and lightweight. Fits perfectly and
                  looks great for casual outings. Would definitely order again!
                </p>
              </div>

              <div className="border-b border-gray-700 pb-4">
                <h4 className="font-semibold text-lg text-black">
                  Alice Turner
                </h4>
                <p className="text-sm text-black mb-1">Rated: ★★★★★</p>
                <p className="text-black text-sm">
                  Really impressed by the quality and comfort. The stitching is
                  excellent, and the color stays bright after washing multiple
                  times.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-black">Mark Lewis</h4>
                <p className="text-sm text-black mb-1">Rated: ★★★☆☆</p>
                <p className="text-black text-sm">
                  Good product overall. The fitting was slightly loose for me,
                  but the fabric quality is top-notch. Delivery was on time and
                  nicely packaged.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <OurBestSellingProducts />
    </div>
  );
};

export default SingleProduct;
