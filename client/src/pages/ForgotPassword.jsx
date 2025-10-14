import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!emailPattern.test(value)) return "Invalid email address";
    return "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    setError(validationError);
    if (validationError) return;

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/send-email`, {
        email,
      });
      toast.success("OTP sent. Please check your email.");
      navigate("/auth/verify-email", { state: { email } });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send OTP. Try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md font-poppins">
      <h2 className="text-3xl font-semibold font-belfast mb-2 text-[#161616]">
        Forgot Password ?
      </h2>
      <p className="text-gray-500 mb-8">
        No worries, we’ll send you reset instructions.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-lg font-medium  font-belfast text-[#161616]">
            E-mail
          </label>
          <Input
            type="email"
            className="mt-2"
            placeholder="youremail@comapny.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <Button
          variant="primary"
          className="py-5"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send E-mail"}
        </Button>
      </form>
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

export default ForgotPassword;
