import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import QtyButton from "../QtyButton";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserCart, removeFromCart } from "@/api";
import { toast } from "sonner";

const CartModel = ({ open, onClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
  const { data } = useQuery({
    queryKey: ["userCart"],
    queryFn: fetchUserCart,
  });

  const cartItems = data?.cartData || [];
  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.qty * item.productId.discountedPrice;
  }, 0);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[400px]  bg-white rounded-2xl shadow-lg p-5 [&_button[data-slot=dialog-close]]:hidden">
        <DialogTitle className="hidden" />
        <div className="max-h-[500px] overflow-y-auto space-y-4">
          {cartItems?.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-5 w-full items-center border-b pb-4 border-b-Light-Silver"
              >
                <div>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      item?.productId?.image
                    }`}
                    className="w-32 h-24 rounded-2xl"
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
                    <Trash2
                      onClick={() =>
                        removeCartMutation.mutate(item.productId._id)
                      }
                      size={18}
                      color="red"
                      className="items-end"
                    />
                    <QtyButton id={item.productId._id} qty={item.qty} />
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
          <span className="text-text-green">
            {new Intl.NumberFormat("en-Us", {
              style: "currency",
              currency: "usd",
            }).format(subTotal)}
          </span>
        </div>
        <Button
          variant="primary"
          disabled={cartItems.length === 0}
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
          disabled={cartItems.length === 0}
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
