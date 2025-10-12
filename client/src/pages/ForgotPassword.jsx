import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const ForgotPassword = () => {
  return (
    <div className="w-full max-w-md font-poppins">
      <h2 className="text-3xl font-semibold font-belfast mb-2 text-[#161616]">
        Forgot Password ?
      </h2>
      <p className="text-gray-500 mb-8">
        No worries, we’ll send you reset instructions.
      </p>

      <form className="space-y-5">
        <div>
          <label className="text-lg font-medium  font-belfast text-[#161616]">
            E-mail
          </label>
          <Input
            type="email"
            className="mt-2"
            placeholder="youremail@comapny.com"
          />
        </div>

        <Button variant="primary" className="py-5" type="submit">
          Send E-mail
        </Button>
      </form>
      <p className="text-sm mt-6 font-medium text[#161616]">
        Back to{" "}
        <a href="#" className="text-green-600 hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default ForgotPassword;
