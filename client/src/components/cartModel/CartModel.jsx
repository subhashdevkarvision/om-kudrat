import React from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import QtyButton from "../QtyButton";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUserCart } from "@/api";

const CartModel = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["userCart"],
    queryFn: fetchUserCart,
  });
  const cartItems = data?.cartData || [];

  console.log("cart data", data);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[400px]  bg-white rounded-2xl shadow-lg p-5 [&_button[data-slot=dialog-close]]:hidden">
        <DialogTitle className="hidden" />
        <div className="max-h-[500px] overflow-y-auto space-y-4">
          {cartItems?.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex w-full items-center border-b pb-4 border-b-Light-Silver"
              >
                <div>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      item?.productId?.image
                    }`}
                    className="size-24"
                    alt=""
                  />
                </div>
                <div className="flex w-full justify-between">
                  <div>
                    <h6 className="font-belfast text-base text-Chinese-Black">
                      {item.productId.name}
                    </h6>
                    <p className="text-xs text-grayish-blue line-through">
                      $ {item?.productId?.price}
                    </p>
                    <p className="text-text-green text-base font-medium">
                      ${item?.productId?.discountedPrice} x{" "}
                      <span>{item.qty}</span>
                    </p>
                  </div>
                  <div className="flex-col flex items-end justify-between">
                    <Trash2 size={18} color="red" className="items-end" />
                    <QtyButton className="p-4" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Cart is empty</p>
          )}
        </div>
        <div className="my-4 flex justify-between font-belfast text-base font-semibold">
          <span className="text-Chinese-Black">Sub Total</span>
          <span className="text-text-green">$11232</span>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/checkout");
            onClose();
          }}
          className="font-medium text-white rounded-full p-6"
        >
          Checkout
        </Button>
        <Button
          variant="outline"
          className="rounded-full p-6 font-medium border-grayish-blue"
          onClick={() => {
            navigate("/cart");
            onClose();
          }}
        >
          View Cart
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CartModel;
