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
import PlaceOrder from "./pages/PlaceOrder";
import ViewCartPage from "./pages/ViewCartPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import FaqPage from "./pages/FaqPage";
import WishlistPage from "./pages/wishlistPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import PaymentResultPage from "./pages/PaymentResultPage";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import ScrollToTop from "./components/ScrollToTop";
import BlogPage from "./pages/BlogPage";
import SingleBlogPage from "./pages/SingleBlogPage";

const App = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

  return (
    <>
      <ScrollToTop />
      <Toaster />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/place-order"
            element={
              <ProtectedRoute>
                <Elements stripe={stripePromise}>
                  <PlaceOrderPage />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <ViewCartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<SingleBlogPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/verify-email" element={<ResendVerifyCode />} />
          <Route path="/auth/verify-code" element={<VerifyCode />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route
          path="/payment-result"
          element={
            <Elements stripe={stripePromise}>
              <PaymentResultPage />
            </Elements>
          }
        />
      </Routes>
    </>
  );
};

export default App;
