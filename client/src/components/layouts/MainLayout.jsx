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
    <div>
      <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
        <Navbar onCartClick={handleCartClick} cartActive={isCartOpen} />
      </div>
      {/* Add padding-top equal to navbar height */}
      <div className="px-4 pt-20 container max-w-7xl xl:px-0 mx-auto">
        <CartModel open={isCartOpen} onClose={handleCartClick} />
        <div className="mt-6 mb-20 font-poppins">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
