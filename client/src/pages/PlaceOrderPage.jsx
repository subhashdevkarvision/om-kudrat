import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import PlaceOrder from "./PlaceOrder";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance, fetchUserCart } from "@/api";
import { X } from "lucide-react";
import { useLocation } from "react-router";
const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const PlaceOrderPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState(null);
  const location = useLocation();
  const { state } = location;
  const { data } = useQuery({
    queryKey: ["userCart"],
    queryFn: fetchUserCart,
  });
  const cartItems = data?.cartData || [];
  const createPaymentIntent = async () => {
    const totalAmount = cartItems.reduce((acc, item) => {
      return acc + item.qty * item.productId.discountedPrice;
    }, 0);
    const { data } = await axiosInstance.post("/payment", {
      amount: totalAmount,
      cartItems,
      deliveryDetails: state,
    });
    console.log(data);
    if (data.success) {
      setOrderId(data.orderId);
      setClientSecret(data.clientSecret);
    }
  };
  useEffect(() => {
    createPaymentIntent();
  }, []);
  return (
    <>
      {clientSecret && orderId ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PlaceOrder orderId={orderId} />
        </Elements>
      ) : (
        <p className="text-center py-10">Loading payment details...</p>
      )}
    </>
  );
};

export default PlaceOrderPage;
