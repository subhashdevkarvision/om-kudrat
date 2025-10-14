import React from "react";
import { Button } from "../ui/button";
import { MoveUpRight } from "lucide-react";
import facebook from "../../assets/facebook-app-symbol.png";
import youtube from "../../assets/youtube.png";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";
import footerLogo from "/footer-logo.svg";
import pay from "../../assets/pay.png";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-5 lg:justify-between">
        <div className="w-full lg:w-[35%] flex flex-col justify-between">
          <div className="">
            <h4 className="font-belfast mb-3.5 text-4xl">
              Fresh <span className="text-text-green">Flavour</span>
              <br /> Endless{" "}
              <span className="text-text-green">Possibilities</span>
            </h4>
            <p className="text-Chinese-Black text-lg max-w-96">
              Revamp your best test buds with delightful experience
            </p>
          </div>
          <Button
            variant="outline"
            className="flex justify-between font-poppins font-medium border-grayish-blue items-center rounded-full w-fit mt-3.5  gap-5 py-5"
          >
            <span className="ml-4">Find A Store</span>{" "}
            <MoveUpRight className="mr-4" />
          </Button>
        </div>
        <div className="lg:w-[65%] flex flex-col space-y-5 md:flex-row md:justify-between">
          <div>
            <p className="font-belfast text-2xl mb-3.5">Company</p>
            <ul className="font-poppins flex flex-col space-y-3.5 text-Black-Olive text-lg">
              <li>About Us</li>
              <li>Shop</li>
              <li>Store Locations</li>
              <li>Our Blog</li>
              <li>Reviews</li>
            </ul>
          </div>
          <div className="">
            <p className="font-belfast text-2xl mb-3.5">Useful Links</p>
            <ul className="font-poppins flex flex-col space-y-3.5 text-Black-Olive text-lg">
              <li>New Products</li>
              <li>Best Seller</li>
              <li>Bundle & Save</li>
              <li>Online Gift</li>
            </ul>
          </div>
          <div>
            <p className="font-belfast text-2xl mb-3.5">Information</p>
            <ul className="font-poppins flex flex-col space-y-3.5 text-Black-Olive text-lg">
              <li>Start a Return</li>
              <li>Contact Us</li>
              <li>Shipping FAQs</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-8 md:items-center gap-6 md:flex-row md:justify-between">
        <div className="flex">
          <Button
            variant="outline"
            className="rounded-full border-grayish-blue flex justify-center items-center px-3.5 py-6"
          >
            <img src={facebook} className="size-5" alt="" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-grayish-blue flex justify-center items-center px-3.5 py-6"
          >
            <img src={instagram} className="size-5" alt="" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-grayish-blue flex justify-center items-center px-3.5 py-6"
          >
            <img src={youtube} className="size-5" alt="" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-grayish-blue flex justify-center items-center px-3.5 py-6"
          >
            <img src={twitter} className="size-5" alt="" />
          </Button>
        </div>
        <div>
          <img src={footerLogo} alt="" />
        </div>
        <div>
          <img src={pay} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
