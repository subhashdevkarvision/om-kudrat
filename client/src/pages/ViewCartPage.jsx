import FrontSection from "@/components/frontSection/FrontSection";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleX } from "lucide-react";
import QtyButton from "@/components/QtyButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserCart, removeFromCart } from "@/api";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import ConfirmationDialog from "@/components/confirmationDialog/ConfirmationDialog";

const ViewCartPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["userCart"],
    queryFn: fetchUserCart,
  });
  const removeCartMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["userCart"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const cartItems = data?.cartData || [];

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.productId.discountedPrice * item.qty;
  }, 0);
  return (
    <div className="space-y-10">
      <FrontSection
        imgUrl="/product-header-img3.png"
        title="Cart Detail"
        path="Home"
        subPath="Cart"
      />
      <div className="flex flex-col flex-wrap lg:flex-row ">
        <div className=" w-full lg:w-[70%]">
          <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
            Shopping bag
          </h5>
          <Table>
            <TableBody className="text-center text-xl">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <TableRow key={item._id} className=" ">
                    <TableCell>
                      <ConfirmationDialog
                        trigger={<CircleX className="cursor-pointer" />}
                        title="Remove item from cart?"
                        description="This will remove the product from your cart."
                        onConfirm={() =>
                          removeCartMutation.mutate(item?.productId?._id)
                        }
                      />
                    </TableCell>
                    <TableCell className="w-24 py-10">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${
                          item?.productId?.image
                        }`}
                        className="w-28 rounded-2xl"
                        alt=""
                      />
                    </TableCell>
                    <TableCell className="font-belfast text-left w-52 ">
                      {item?.productId?.name}
                    </TableCell>
                    <TableCell className="font-medium text-Black-Olive">
                      ${item?.productId?.discountedPrice}
                    </TableCell>
                    <TableCell className="">
                      <QtyButton
                        className="w-fit text-center mx-auto"
                        qty={item.qty}
                        id={item.productId._id}
                      />
                    </TableCell>
                    <TableCell className=" text-text-green font-medium">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "usd",
                      }).format(item?.productId?.discountedPrice * item.qty)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>Cart is empty</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="w-full lg:w-[30%]">
          <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
            Cart Totals
          </h5>
          <div className="bg-[url('/cartDesign.png')] space-y-5 py-20 bg-cover  bg-no-repeat">
            <div className="px-10">
              <div className="flex justify-between  mb-6">
                <p className="font-medium text-Chinese-Black">Subtotal</p>
                <p className="font-medium text-2xl text-Chinese-Black">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "usd",
                  }).format(subTotal)}
                </p>
              </div>
              <div className="grid grid-cols-2 py-5  border-y">
                <p className="font-medium text-Chinese-Black">Includes CGST</p>
                <p className="font-medium text-xl text-right text-Chinese-Black">
                  {subTotal ? "$32.12" : "$0"}
                </p>
                <p className="font-medium text-Chinese-Black">Includes SGST</p>
                <p className="font-medium text-xl text-right text-Chinese-Black">
                  {subTotal ? "$32.12" : "$0"}
                </p>
              </div>
              <div className="flex justify-between mt-6 ">
                <p className="font-medium text-Chinese-Black">Total</p>
                <p className="font-medium text-2xl text-text-green">
                  {subTotal
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "usd",
                      }).format(subTotal + 32.12 + 32.12)
                    : "$0"}
                </p>
              </div>
            </div>
            <div className="border-y pt-10 ">
              <div className="px-10">
                <Label htmlFor="couponCode" className="text-base font-medium">
                  Have a gift card ?
                </Label>
                <div className="flex items-center my-5">
                  <Input
                    type="text"
                    className="rounded-full px-5 py-6 bg-white border-grayish-blue placeholder:text-Black-Olive text-Black-Olive"
                    placeholder="Gift card number"
                  ></Input>
                  <Button
                    variant="primary"
                    className="w-fit rounded-full px-7 py-6"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
            <div className="px-10">
              <Button
                onClick={() => navigate("/checkout")}
                variant="primary"
                className="rounded-full py-6 my-4"
              >
                Procced to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCartPage;
