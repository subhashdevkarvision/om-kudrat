import React from "react";
import loginImg from "../assets/login-img.jpg";
import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <div className="flex flex-col lg:flex-row min-h-screen">
    {/* Left Section */}
    <div className="w-full lg:w-[49%] flex flex-col justify-center items-center py-2 px-4 sm:px-6 md:px-12 bg-white">
      <Outlet />
    </div>
    {/* Right Image Section */}
    <div className="hidden lg:flex w-[51%] h-screen">
      <img
        src={loginImg}
        alt="Food ingredients"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

export default AuthLayout;
