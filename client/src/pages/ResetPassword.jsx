import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const ResetPassword = () => {
  return (
    <div className="w-full max-w-md font-poppins">
      <h2 className="text-3xl font-semibold font-belfast mb-2 text-[#161616]">
        Reset Password
      </h2>
      <p className="text-gray-500 mb-8">
        Enter your new password for your account.
      </p>

      <form className="space-y-5">
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            Password
          </label>
          <Input
            type="password"
            className="mt-3"
            placeholder="minimum 8 characters"
          />
        </div>
        <div>
          <label className="text-lg font-medium font-belfast text-[#161616]">
            Re-enter Password
          </label>
          <Input type="password" placeholder="minimum 8 characters" />
          <div className="flex flex-row justify-between mt-2 items-center text-sm">
            <div className="flex gap-2">
              <input id="rmm" type="checkbox" className="accent-green-600" />
              <label
                htmlFor="rmm"
                className="flex text-[#161616] font-[400] gap-2"
              >
                Remember Me
              </label>
            </div>
          </div>
        </div>

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

export default ResetPassword;
