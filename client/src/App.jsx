import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/sonner";
import ResendVerifyCode from "./pages/ResendVerifyCode";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/verify-email" element={<ResendVerifyCode />} />
          <Route path="/auth/verify-code" element={<VerifyCode />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
