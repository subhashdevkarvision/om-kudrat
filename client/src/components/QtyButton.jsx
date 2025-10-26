import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decrementQty, incrementQty } from "@/api";
import { toast } from "sonner";

const QtyButton = ({ className, id, qty }) => {
  const queryClient = useQueryClient();

  const incrementQtyMutation = useMutation({
    mutationFn: incrementQty,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["userCart"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
  const decrementQtyMutation = useMutation({
    mutationFn: decrementQty,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["userCart"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
  return (
    <div
      className={`flex bg-[#EFEFEF] rounded-full p-0 m-0 items-center gap-3 ${className}`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-[#EFEFEF]"
        onClick={() => decrementQtyMutation.mutate(id)}
      >
        <Minus size={18} className="text-text-green" />
      </Button>

      <span className="mx-2 text-lg font-semibold">{qty}</span>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-[#EFEFEF]"
        onClick={() => incrementQtyMutation.mutate(id)}
      >
        <Plus size={18} className="text-text-green" />
      </Button>
    </div>
  );
};

export default QtyButton;
