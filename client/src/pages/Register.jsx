import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import google from "../assets/search.png";
import facebook from "../assets/facebook1.png";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const Register = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const validate = () => {
    const err = {};
    if (!fields.name.trim()) {
      err.name = "Name is required";
    }
    if (!fields.email) {
      err.email = "Email is required";
    } else if (!emailPattern.test(fields.email)) {
      err.email = "Email format is invalid";
    }
    if (!fields.password) {
      err.password = "Password is required";
    } else if (fields.password.length < 8) {
      err.password = "Password must be at least 8 characters";
    }
    if (!fields.confirmPassword) {
      err.confirmPassword = "Confirm password is required";
    } else if (fields.password !== fields.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }
    if (!fields.terms) {
      err.terms = "You must agree to Terms & Privacy";
    }
    return err;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          name: fields.name,
          email: fields.email,
          password: fields.confirmPassword,
        }
      );

      if (response.data.success) {
        toast.success("Registration successful!");
        setFields({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });
        navigate("/auth");
      } else {
        toast.error(response.data.error.message || "Registration failed!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md font-poppins">
      <h2 className="text-3xl font-semibold font-belfast mb-2 text-[#161616]">
        Get Started Now
      </h2>
      <p className="text-gray-500 mb-8">
        Enter your credentials to make your account
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button className="flex-1 bg-white border text-black border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
          <img src={google} alt="Google" className="w-5 h-5" />
          Log in with Google
        </Button>
        <Button className="flex-1 bg-white text-black border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
          <img src={facebook} alt="Facebook" className="w-5 h-5" />
          Log in with Facebook
        </Button>
      </div>

      <div className="flex items-center my-4">
        <hr className="flex-1 border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">or</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            Name
          </label>
          <Input
            type="text"
            name="name"
            className="my-0"
            placeholder="Enter name"
            value={fields.name}
            onChange={handleChange}
          />{" "}
          {errors.name && (
            <div className="text-sm text-red-500">{errors.name}</div>
          )}
        </div>
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            E-mail Address
          </label>
          <Input
            type="email"
            name="email"
            className="my-0"
            placeholder="youremail@comapny.com"
            value={fields.email}
            onChange={handleChange}
          />{" "}
          {errors.email && (
            <div className="text-sm text-red-500">{errors.email}</div>
          )}
        </div>
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            Password
          </label>
          <Input
            type="password"
            className="my-0"
            name="password"
            placeholder="minimum 8 characters"
            value={fields.password}
            onChange={handleChange}
          />{" "}
          {errors.password && (
            <div className="text-sm text-red-500">{errors.password}</div>
          )}
        </div>
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            Re-enter Password
          </label>
          <Input
            type="password"
            className="my-0"
            name="confirmPassword"
            placeholder="minimum 8 characters"
            value={fields.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="text-sm text-red-500">{errors.confirmPassword}</div>
          )}
          <div className="flex flex-row justify-between mt-2 items-center text-sm">
            <div className="flex gap-2">
              <input id="rmm" type="checkbox" className="accent-green-600" />
              <label
                htmlFor="rmm"
                className="flex items-center text-[#161616] font-[400] gap-2"
              >
                Remember Me
              </label>
            </div>
            <a
              onClick={() => navigate("/auth/forgot-password")}
              className="text-text-green cursor-pointer hover:underline sm:mt-0"
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-[#161616]">
          <input
            type="checkbox"
            name="terms"
            checked={fields.terms}
            onChange={handleChange}
            className="accent-green-600"
          />
          <span className="font-[500]">
            I agree to the{" "}
            <a href="#" className="">
              Terms & Privacy
            </a>
          </span>
        </label>
        {errors.terms && (
          <div className="text-sm text-red-500 mt-1">{errors.terms}</div>
        )}
        <Button
          variant="primary"
          className="py-5"
          disabled={submitting}
          type="submit"
        >
          {submitting ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
      <p className="text-sm mt-6 font-medium text[#161616]">
        Have an account ?{" "}
        <a
          onClick={() => navigate("/auth/")}
          className="text-text-green cursor-pointer hover:underline"
        >
          Log in
        </a>
      </p>
    </div>
  );
};

export default Register;
