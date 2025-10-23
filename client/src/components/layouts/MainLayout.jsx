import React, { useState } from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router";
import Footer from "../footer/Footer";
import CartModel from "../cartModel/CartModel";

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="px-4 py-4 font-poppins container max-w-7xl xl:px-0 mx-auto">
      <Navbar onCartClick={handleCartClick} cartActive={isCartOpen} />
      <CartModel open={isCartOpen} onClose={handleCartClick} />
      <div className="mt-6 mb-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
