import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const VerifyCode = () => {
  return (
    <div className="w-full max-w-sm font-poppins">
      <h2 className="text-3xl font-semibold font-belfast mb-2 text-[#161616]">
        Verify Code
      </h2>
      <p className="text-gray-500 mb-8">
        Enter your verification code that we sent you through your e-mail.
      </p>

      <form className="space-y-5">
        <div className="flex gap-4 mb-8 mt-4">
          {Array(4)
            .fill(null)
            .map((_, idx) => (
              <Input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-16 h-16 text-2xl text-center bg-[#EFEFEF] rounded-lg border-2 border-[#018D43] focus:border-[#018D43]"
                autoFocus={idx === 0}
              />
            ))}
        </div>

        <Button variant="primary" className="py-6" type="submit">
          Verify Code
        </Button>
      </form>
      <p className="text-sm mt-6 font-medium text[#161616]">
        Back to{" "}
        <a href="#" className="text-green-600 hover:underline">
          Forgot Password
        </a>
      </p>
    </div>
  );
};

export default VerifyCode;
