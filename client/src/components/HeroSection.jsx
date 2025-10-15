import IconBadge from "./IconBadge";
import { Button } from "./ui/button";
import { Mail, Star } from "lucide-react";
import { ChevronsDown } from "lucide-react";
import explore from "../assets/explore.png";
import { MoveUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="flex flex-col flex-wrap md:flex-row gap-3 lg:gap-0 lg:justify-between">
      <div className="w-full lg:w-[35%] flex flex-col space-y-7 relative">
        <div className="flex bg-white">
          <IconBadge title="Seeds" />
          <IconBadge title="Organic" />
        </div>
        <h1 className="uppercase text-Chinese-Black text-4xl font-belfast">
          <span className="text-text-green">PLUSes & Spices:</span> Fresh <br />
          Flavours, <span className="text-text-green">Endless</span>
          <br />
          Possibilities
        </h1>
        {/* <hr className="text-grayish-blue" /> */}
        <p className="max-w-60 font-poppins border-t-2 pt-3.5 text-sm text-Black-Olive">
          Revamp your best test buds with delightful experience
        </p>
        <div className="font-poppins font-medium">
          <Button
            variant="primary"
            className="w-fit py-6 px-6 rounded-full text-base"
          >
            Shop Now
          </Button>
          <Button
            variant="outline"
            className="w-fit border-grayish-blue py-6 px-6 rounded-full text-base"
          >
            Explore
          </Button>
        </div>
        <div>
          <Button variant="outline" className="rounded-full p-6">
            <Mail className="size-6" />
          </Button>
          <Button variant="outline" className="rounded-full p-6">
            <ChevronsDown className="size-6" />
          </Button>
        </div>
      </div>
      <div className="w-full h-80 sm:h-auto bg-cover bg-[url('/coriander.jpg')] bg-center rounded-4xl md:w-[49%] lg:w-[35%] relative">
        <div className="absolute right-5 top-5">
          <div className="p-4 bg-[#FFFFFF66]  text-Chinese-Black max-w-36 rounded-3xl border border-[#FFFFFF80] backdrop-blur-xl relative">
            <MoveUpRight size={16} className="absolute right-4" />
            <p className="font-belfast text-2xl mb-2">17</p>
            <p className="font-poppins text-xs">
              Winning Awards & Certificates
            </p>
          </div>
        </div>
        <button className="bg-[#16161666] w-fit border font-poppins border-[#FFFFFF80] flex items-center gap-2 px-2 py-1.5 rounded-full bottom-5 left-5 absolute">
          <Star fill="#d4eee3" size={20} className="text-[#d4eee3]" />
          <p className="text-sm text-white">Purity is our tradition</p>
        </button>
      </div>
      <div className="w-full md:w-[49%] lg:w-[28%] flex flex-col justify-between">
        <div className="flex justify-between mb-8">
          <div>
            <p className="font-belfast text-base mb-1.5 text-Chinese-Black">
              Natural Spice
            </p>
            <p className="font-poppins text-xs max-w-28 pt-1.5 border-t border-t-grayish-blue">
              We are focusing on Natural spice
            </p>
          </div>
          <img src={explore} className="w-24 " alt="" />
        </div>
        <div className="bg-[url('/herosection2.png')] h-[348px] bg-center bg-cover rounded-4xl relative p-5">
          <button className="bg-[#FFFFFF66] w-fit border font-poppins border-[#FFFFFF80] flex items-center gap-2 px-2 py-1.5 rounded-full">
            <Star fill="#d4eee3" size={20} className="text-[#d4eee3]" />
            <p className="text-sm text-white">Healthy</p>
          </button>
          <div className="absolute right-5 bottom-5">
            <div className="p-4 bg-[#16161666]  text-white max-w-36 rounded-3xl border border-[#FFFFFF80] backdrop-blur-xl relative">
              <MoveUpRight size={16} className="absolute right-4" />
              <p className="font-belfast text-2xl mb-2">17</p>
              <p className="font-poppins text-xs">
                Winning Awards & Certificates
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
