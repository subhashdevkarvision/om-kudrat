import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import google from "../assets/search.png";
import facebook from "../assets/facebook1.png";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const Login = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const validate = () => {
    const newErr = {};
    if (!fields.name.trim()) {
      newErr.name = "Name is required";
    }

    if (!fields.email) {
      newErr.email = "Email is required";
    } else if (!emailPattern.test(fields.email)) {
      newErr.email = "Email is not valid";
    }
    if (!fields.password) {
      newErr.password = "Password is required";
    } else if (fields.password.length < 8) {
      newErr.password = "Password must be 8+ characters";
    }
    if (!fields.terms) {
      newErr.terms = "You must agree to Terms & Privacy";
    }
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        { name: fields.name, email: fields.email, password: fields.password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem(
          "token",
          JSON.stringify(res.data.authenticationKey)
        );
        setFields({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="w-full max-w-md font-poppins">
      <h2 className="text-3xl font-medium font-belfast mb-2 text-[#161616]">
        Get Started Now
      </h2>
      <p className="text-Black-Olive font-poppins text-sm mb-8">
        Enter your credentials to access your account
      </p>

      <div className="flex flex-col font-poppins sm:flex-row gap-4 mb-8">
        <Button className="flex-1 bg-white border text-Chinese-Black border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
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
            className="my-0"
            placeholder="Enter name"
            name="name"
            value={fields.name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="text-sm text-red-500 mt-1">{errors.name}</div>
          )}
        </div>
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            E-mail Address
          </label>
          <Input
            type="email"
            className="my-0"
            placeholder="youremail@comapny.com"
            value={fields.email}
            name="email"
            onChange={handleChange}
          />
          {errors.email && (
            <div className="text-sm text-red-500 mt-1">{errors.email}</div>
          )}
        </div>
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            Password
          </label>
          <Input
            type="password"
            className="my-0"
            placeholder="minimum 8 characters"
            name="password"
            value={fields.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-sm text-red-500 mt-1">{errors.password}</div>
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
              className="text-text-green hover:underline sm:mt-0 cursor-pointer"
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-[#161616]">
          <input
            type="checkbox"
            className="accent-green-600"
            checked={fields.terms}
            onChange={handleChange}
            name="terms"
          />
          <span className="font-[500]">
            I agree to the{" "}
            <a href="#" className="underline">
              Terms & Privacy
            </a>
          </span>
        </label>
        {errors.terms && (
          <div className="text-sm text-red-500 mt-1">{errors.terms}</div>
        )}
        <Button variant="primary" className="py-5" type="submit">
          Login
        </Button>
      </form>
      <p className="text-sm mt-6 font-medium text[#161616]">
        Don’t have an account?{" "}
        <a
          onClick={() => navigate("/auth/register")}
          className="text-green-600 hover:underline cursor-pointer"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
