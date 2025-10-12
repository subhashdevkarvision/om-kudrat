import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import google from "../assets/search.png";
import facebook from "../assets/facebook1.png";
import React from "react";

const Login = () => {
  return (
    <div className="w-full max-w-md font-poppins">
      <h2 className="text-3xl font-semibold font-belfast mb-2 text-[#161616]">
        Get Started Now
      </h2>
      <p className="text-gray-500 mb-8">
        Enter your credentials to access your account
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

      <form className="space-y-5">
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            Name
          </label>
          <Input type="text" className="my-0" placeholder="Enter name" />
        </div>
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            E-mail Address
          </label>
          <Input
            type="email"
            className="my-0"
            placeholder="youremail@comapny.com"
          />
        </div>
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            Password
          </label>
          <Input
            type="password"
            className="my-0"
            placeholder="minimum 8 characters"
          />
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
            <a href="#" className="text-text-green hover:underline sm:mt-0">
              Forgot Password?
            </a>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-[#161616]">
          <input type="checkbox" className="accent-green-600" />
          <span className="font-[500]">
            I agree to the{" "}
            <a href="#" className="">
              Terms & Privacy
            </a>
          </span>
        </label>
        <Button variant="primary" className="py-5" type="submit">
          Login
        </Button>
      </form>
      <p className="text-sm mt-6 font-medium text[#161616]">
        Don’t have an account?{" "}
        <a href="#" className="text-green-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
