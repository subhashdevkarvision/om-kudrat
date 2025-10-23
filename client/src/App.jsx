import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/sonner";
import ResendVerifyCode from "./pages/ResendVerifyCode";
import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/verify-email" element={<ResendVerifyCode />} />
          <Route path="/auth/verify-code" element={<VerifyCode />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
