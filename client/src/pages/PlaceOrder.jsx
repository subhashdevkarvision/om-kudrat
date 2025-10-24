import FrontSection from "@/components/frontSection/FrontSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    houseNumStreetName: "",
    apartment: "",
    city: "",
    postCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const stripe = useStripe();
  const elements = useElements();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.houseNumStreetName.trim()) {
      newErrors.houseNumStreetName = "Street address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.postCode.trim()) {
      newErrors.postCode = "Postcode is required";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log(validateForm);
      return;
    }
    console.log("submitted", formData);
  };
  return (
    <div className="space-y-10">
      <FrontSection
        imgUrl="/product-header-img4.png"
        title="Place Order"
        path="Home"
        subPath="Cart"
      />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2">
        <div>
          <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
            Billing Details
          </h5>
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 space-x-5 space-y-7">
              {[
                { name: "firstName", label: "First name *" },
                { name: "lastName", label: "Last name" },
                { name: "mobile", label: "Phone number *" },
                { name: "email", label: "Email address *" },
                { name: "houseNumStreetName", label: "Street Address *" },
                { name: "apartment", label: "Apartment" },
                { name: "city", label: "Town / City *" },
                { name: "postCode", label: "Postcode *" },
                { name: "country", label: "Country *" },
              ].map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label.replace("*", "").trim()}`}
                    className={`text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                  />
                  {errors[field.name] && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        </div>
        <div>
          <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
            Payment
          </h5>
          <p className="text-base font-belfast mb-2.5">Card Payment</p>
          <CardElement className="p-5 border rounded-lg border-grayish-blue" />
          {/* <div>
            <Input
              name="cardNumber"
              id="cardNumber"
              type="text"
              placeholder="Card Number"
              className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
            />
            <div className="grid grid-cols-2 gap-5">
              <Input
                name="expiryDate"
                id="expiryDate"
                type="text"
                placeholder="Expiration date (MM/YY)"
                className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
              />
              <Input
                name="securityCode"
                id="securityCode"
                type="text"
                placeholder="Security Code"
                className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
              />
            </div>
            <Input
              name="cardHolderName"
              id="cardHolderName"
              type="text"
              placeholder="Name Of Card Holder"
              className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
            />
          </div> */}
          <Button
            variant="primary"
            type="submit"
            className="rounded-full py-6 my-5"
          >
            Pay Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
