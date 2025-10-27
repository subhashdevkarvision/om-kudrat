import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const PaymentStatus = () => {
  const stripe = useStripe();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const retrive = async () => {
      const queryParams = new URLSearchParams(window.location.href);
      const clientSecret = queryParams.get("payment_intent_client_secret");
      if (!stripe || !clientSecret) return;

      const { paymentIntent, error: retrieveError } =
        await stripe.retrievePaymentIntent(clientSecret);
      if (retrieveError) {
        setStatus("error");
        setMessage(
          "Unable to retrieve payment status: " + retrieveError.message
        );
        return;
      }
      if (!paymentIntent) {
        setStatus("error");
        setMessage("PaymentIntent not found.");
        return;
      }
      switch (paymentIntent.status) {
        case "succeeded":
          setStatus("succeeded");
          setMessage("Payment succeeded. Thank you!");
          break;

        case "requires_payment_method":
          setStatus("failed");
          setMessage(
            "Payment failed. Please try again with a different method."
          );
          break;

        case "processing":
          setStatus("processing");
          setMessage("Payment is processing. We will update you soon.");
          break;

        default:
          setStatus("error");
          setMessage("Unexpected payment status: " + paymentIntent.status);
          break;
      }
    };
    retrive();
  }, [stripe]);
  const renderTitle = () => {
    switch (status) {
      case "succeeded":
        return " Success";
      case "failed":
        return " Payment Failed";
      case "processing":
        return " Processing";
      case "error":
        return " Error";
      default:
        return "";
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">{renderTitle()}</h2>
        <p className="text-gray-700 mb-6 text-center">{message}</p>

        {status === "succeeded" && (
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-text-green hover:bg-text-green focus:ring-2 focus:ring-red-400 focus:outline-none text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Continue Shopping...
            </button>
          </div>
        )}
        {status === "failed" && (
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {status === "processing" && (
          <div className="flex justify-center">
            <span className="text-blue-500">Please wait …</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
