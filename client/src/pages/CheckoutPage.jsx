import FrontSection from "@/components/frontSection/FrontSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const CheckoutPage = () => {
  return (
    <div>
      <FrontSection
        imgUrl="/product-header-img3.png"
        title="Checkout"
        path="Home"
        subPath="Cart"
      />
      <div>
        <div>
          <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
            Delivery
          </h5>
          <form action="">
            <div className="grid grid-cols-1 sm:grid-cols-2 space-x-5 space-y-7">
              <div>
                <Label htmlFor="firstName">First name *</Label>
                <Input
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
                />
              </div>
              <div>
                <Label htmlFor="mobile">Phone number *</Label>
                <Input
                  name="mobile"
                  type="text"
                  placeholder="Enter number"
                  className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
                />
              </div>
              <div>
                <Label htmlFor="email">Email address *</Label>
                <Input
                  name="email"
                  type="text"
                  placeholder="Enter email"
                  className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
                />
              </div>
              <div>
                <Label htmlFor="houseNumStreetName">Street Address *</Label>
                <Input
                  name="houseNumStreetName"
                  type="text"
                  placeholder="House number and street name"
                  className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
                />
              </div>
              <div>
                <Label htmlFor="apartment" className="">
                  Apartment
                </Label>
                <Input
                  name="apartment"
                  type="text"
                  placeholder="Apartment, suits, etc..."
                  className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
                />
              </div>
              <div>
                <Label htmlFor="city">Town / City *</Label>
                <Input
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
                />
              </div>
              <div>
                <Label htmlFor="postCode">Postcode *</Label>
                <Input
                  name="postCode"
                  type="text"
                  placeholder="Enter code"
                  className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  name="country"
                  type="text"
                  placeholder="Enter country"
                  className="text-grayish-blue border p-5 text-sm placeholder:text-grayish-blue border-grayish-blue"
                />
              </div>
            </div>
            <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
              Additional Information
            </h5>
            <div>
              <Label htmlFor="additionalDetails">Other Notes</Label>
              <Textarea
                name="additionalDetails"
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
                <Checkbox id="shippingMethod" />
              </div>
            </div>
          </form>
        </div>
        <div>
          <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
            Your Order
          </h5>
          <Table>
            <TableHeader>
              <TableRow className="text-base text-Black-Olive">
                <TableHead colSpan={2}>Products</TableHead>
                <TableHead>Sub Total</TableHead>
              </TableRow>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <img src="/product1.png" className="size-24" alt="" />
                  </TableCell>
                  <TableCell className="font-belfast"></TableCell>
                </TableRow>
              </TableBody>
            </TableHeader>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
