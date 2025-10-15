import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const VerifyCode = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      const newOtp = [...otp];
      newOtp[idx] = val.slice(-1);
      setOtp(newOtp);
      if (val && idx < 3) inputsRef.current[idx + 1].focus();
    }
  };
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };
  const validate = () => {
    if (otp.some((v) => v === "")) return false;
    return true;
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{4,}$/.test(pastedData)) {
      const pasteDigits = pastedData.slice(0, 4).split("");
      const newOtp = [...otp];
      pasteDigits.forEach((digit, idx) => {
        newOtp[idx] = digit;
      });
      setOtp(newOtp);

      const lastIndex = Math.min(pasteDigits.length - 1, 3);
      inputsRef.current[lastIndex]?.focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all 4 digits of the OTP");
      return;
    }
    setSubmitting(true);
    try {
      const fullOtp = otp.join("");
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/verify-code`,
        { email, otp: fullOtp }
      );
      toast.success(res.data.message || "OTP verified!");
      navigate("/auth/reset-password", { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setSubmitting(false);
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

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-8 mt-4" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <Input
              key={idx}
              maxLength={1}
              type="text"
              inputMode="numeric"
              className="w-16 h-16 text-2xl text-center bg-[#EFEFEF] rounded-lg border-2 border-[#018D43] focus:border-[#018D43]"
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
              autoFocus={idx === 0}
            />
          ))}
        </div>

        <Button
          variant="primary"
          className="py-6"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
      <p className="text-sm mt-6 font-medium text[#161616]">
        Back to{" "}
        <a
          onClick={() => navigate("/auth/forgot-password")}
          className="text-green-600 hover:underline cursor-pointer"
        >
          Forgot Password
        </a>
      </p>
    </div>
  );
};

export default VerifyCode;
