import { fetchUserCart } from "@/api";
import FrontSection from "@/components/frontSection/FrontSection";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const CheckoutPage = () => {
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
    additionalDetails: "",
    shippingMethod: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["userCart"],
    queryFn: fetchUserCart,
  });
  const cartItems = data?.cartData || [];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, shippingMethod: checked }));
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
      return;
    }
    navigate("/place-order", { state: formData });
  };
  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.qty * item?.productId?.discountedPrice;
  }, 0);
  return (
    <div className="space-y-10">
      <FrontSection
        imgUrl="/product-header-img3.png"
        title="Checkout"
        path="Home"
        subPath="Cart"
      />
      <form
        action=""
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        <div className="sm:border-r sm:pr-5 sm:border-r-[#D9D9D980]">
          <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
            Delivery
          </h5>
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-7">
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
                <div key={field.name} className="flex flex-col">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    name={field.name}
                    type="text"
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
            <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
              Additional Information
            </h5>
            <div>
              <Label htmlFor="additionalDetails">Other Notes</Label>
              <Textarea
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                placeholder="Notes about your order, e.g. special note for delivery."
                className="border border-grayish-blue my-3"
              ></Textarea>
            </div>
            <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
              Shipping Method
            </h5>
            <div className="flex justify-between border p-2.5 rounded-lg border-grayish-blue">
              <Label htmlFor="shippingMethod" className="text-Chinese-Black">
                Stander Shipping
              </Label>
              <div>
                <span className="text-Chinese-Black mx-2">$10.00</span>
                <Checkbox
                  id="shippingMethod"
                  checked={formData.shippingMethod}
                  onCheckedChange={handleCheckboxChange}
                />
              </div>
            </div>
          </>
        </div>
        <div>
          <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
            Your Order
          </h5>
          <Table>
            <TableHeader>
              <TableRow className="text-base text-Black-Olive">
                <TableHead colSpan={2}>Products</TableHead>
                <TableHead className="text-right">Sub Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <TableRow key={item._id} className="">
                    <TableCell className="py-10">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${
                          item?.productId?.image
                        }`}
                        className="size-24"
                        alt=""
                      />
                    </TableCell>
                    <TableCell className="font-belfast text-2xl">
                      {item?.productId?.name} x <span>{item.qty}</span>
                    </TableCell>
                    <TableCell className="text-2xl text-text-green font-medium text-right">
                      ${item?.productId?.discountedPrice}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>Empty Cart</TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow className="text-xl bg-white  text-Black-Olive">
                <TableCell colSpan={2}>Sub Total</TableCell>
                <TableCell className="text-right py-5">${subTotal}</TableCell>
              </TableRow>
              <TableRow className="text-2xl bg-white text-Black-Olive">
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right py-5">${subTotal}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div>
            <div className="border-y pt-10 ">
              <Label htmlFor="couponCode" className="text-base font-normal">
                <span className="font-medium">Have a coupon ?</span> enter your
                code
              </Label>
              <div className="flex items-center my-5">
                <Input
                  type="text"
                  className="rounded-full px-5 border-grayish-blue placeholder:text-Black-Olive text-Black-Olive"
                  placeholder="Coupon Code"
                ></Input>
                <Button
                  variant="primary"
                  className="w-fit rounded-full px-7 py-2"
                >
                  Apply
                </Button>
              </div>
            </div>
            <Button
              variant="primary"
              type="submit"
              className="rounded-full py-5 my-10"
            >
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
