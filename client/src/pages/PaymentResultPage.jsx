import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const PaymentResultPage = () => {
  const stripe = useStripe();
  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'failed' | 'canceled'
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Parse client secret from URL
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret || !stripe) return;

    const fetchPaymentStatus = async () => {
      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      switch (paymentIntent.status) {
        case "succeeded":
          setStatus("success");
          setMessage("Your payment was successful! ");
          break;
        case "processing":
          setStatus("loading");
          setMessage("Your payment is processing. Please wait...");
          break;
        case "requires_payment_method":
          setStatus("failed");
          setMessage("Payment failed. Please try again.");
          break;
        case "canceled":
          setStatus("canceled");
          setMessage("Your payment was canceled.");
          break;
        default:
          setStatus("failed");
          setMessage("Something went wrong. Please contact support.");
      }
    };

    fetchPaymentStatus();
  }, [stripe]);

  const renderIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-16 h-16 text-green-600" />;
      case "failed":
        return <XCircle className="w-16 h-16 text-red-600" />;
      case "canceled":
        return <AlertCircle className="w-16 h-16 text-yellow-500" />;
      default:
        return <Loader2 className="w-16 h-16 animate-spin text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
      {renderIcon()}
      <h1 className="text-3xl font-bold font-belfast">
        {status === "loading" ? "Processing Payment..." : message}
      </h1>
      {status !== "loading" && (
        <div className="flex gap-4">
          <Button
            variant="primary"
            onClick={() => navigate("/")}
            className="rounded-full px-6 py-3"
          >
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentResultPage;
