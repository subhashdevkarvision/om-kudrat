import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const validate = () => {
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (!email) {
      toast.error("Email is missing. Please try the reset process again.");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/reset-password`,
        { email, password }
      );
      toast.success(response.data.message || "Password reset successful!");
      navigate("/auth");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md font-poppins">
      <h2 className="text-3xl font-semibold font-belfast mb-2 text-[#161616]">
        Reset Password
      </h2>
      <p className="text-gray-500 mb-8">
        Enter your new password for your account.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            Password
          </label>
          <Input
            type="password"
            className="mt-3"
            placeholder="minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            Re-enter Password
          </label>
          <Input
            type="password"
            placeholder="minimum 8 characters"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex flex-row justify-between mt-2 items-center text-sm">
            <div className="flex gap-2">
              <input id="rmm" type="checkbox" className="accent-green-600" />
              <label
                htmlFor="rmm"
                className="flex text-[#161616] font-[400] gap-2"
              >
                Remember Me
              </label>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          className="py-5"
          type="submit"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
      <p className="text-sm mt-6 font-medium text[#161616]">
        Don’t have an account?{" "}
        <a
          href="/auth/register"
          className="text-green-600 hover:underline cursor-pointer"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default ResetPassword;
