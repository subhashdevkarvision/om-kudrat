import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="px-4 py-4 font-poppins container max-w-7xl xl:px-0 mx-auto">
      <Navbar />
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
