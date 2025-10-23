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

const CartModel = ({ open, onClose, cartItems }) => {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[400px] fixed lg:top-70  bg-white rounded-2xl shadow-lg p-5 [&_button[data-slot=dialog-close]]:hidden">
        <DialogTitle className="hidden" />
        {cartItems?.length > 0 ? (
          <p>cart items</p>
        ) : (
          <div className="flex items-center border-b pb-4 border-b-Light-Silver">
            <div>
              <img src="/product1.png" className="size-24" alt="" />
            </div>
            <div className="flex">
              <div>
                <h6 className="font-belfast text-base text-Chinese-Black">
                  Yuvika Anesu Asli
                </h6>
                <p className="text-xs text-grayish-blue line-through">$41.50</p>
                <p className="text-text-green text-base font-medium">
                  $32.50 x <span>1</span>
                </p>
              </div>
              <div className="flex-col flex items-end justify-between">
                <Trash2 size={18} color="red" className="items-end" />
                <QtyButton className="p-4" />
              </div>
            </div>
          </div>
        )}
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
        >
          View Cart
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CartModel;
