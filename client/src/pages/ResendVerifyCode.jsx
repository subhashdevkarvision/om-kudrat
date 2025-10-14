import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const ResendVerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [loading, setLoading] = useState(false);
  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/send-email`, {
        email,
      });
      toast.success("OTP resent successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm font-poppins">
      <h2 className="text-3xl font-semibold font-belfast mb-2 text-[#161616]">
        Verify Code
      </h2>
      <p className="text-gray-500 mb-8">
        Enter your verification code that we sent you through your e-mail.
      </p>

      <form className="space-y-5">
        <div className="flex font-belfast gap-4 text-text-green text-3xl mb-8 mt-4">
          {email}
        </div>
        <p className="text-xs text-Chinese-Black">Didn’t receive the email?</p>

        <Button
          variant="primary"
          onClick={handleResendOtp}
          className="py-6"
          type="submit"
          disabled={loading}
        >
          {loading ? "Resending OTP..." : "Resend OTP"}
        </Button>
      </form>
      <p className="text-sm mt-6 font-medium text[#161616]">
        Back to{" "}
        <a
          onClick={() => navigate("/auth/forgot-password")}
          className="text-green-600 hover:underline"
        >
          Forgot Password
        </a>
      </p>
      <p className="text-sm mt-6 font-medium text[#161616]">
        Back to{" "}
        <a
          onClick={() => navigate("/auth")}
          className="text-green-600 hover:underline"
        >
          Log in
        </a>
      </p>
    </div>
  );
};

export default ResendVerifyCode;
