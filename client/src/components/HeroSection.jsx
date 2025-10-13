import { BsFillCheckCircleFill, BsFillStarFill } from "react-icons/bs";
import { FiArrowUpRight, FiChevronDown, FiAward } from "react-icons/fi";
import heroImg from "../assets/herosection.png";
import IconBadge from "./IconBadge";
// import naturalSpiceImg from "../assets/natural-spice.jpg";

export default function HeroSection() {
  return (
    <section className="flex">
      <div className="flex w-[70%]">
        <div>
          <div className="flex">
            <IconBadge title={"Seeds"} />
            <IconBadge title={"Organic"} />
          </div>
          <h1 className="text-3xl pe-3 rounded-e-2xl    inline-block bg-white sm:text-4xl xl:text-5xl font-semibold leading-tight ">
            <span className="text-text-green">PLUSES & SPICES</span>: FRESH{" "}
            <br />{" "}
          </h1>{" "}
          <h1 className="text-3xl pe-3 rounded-e-2xl    inline-block bg-white sm:text-4xl xl:text-5xl font-semibold leading-tight ">
            FLAVOURS, <span className="text-text-green">ENDLESS</span>{" "}
          </h1>{" "}
          <h1 className="text-3xl pe-3 rounded-e-2xl    inline-block bg-white sm:text-4xl xl:text-5xl font-semibold leading-tight ">
            POSSIBILITIES{" "}
          </h1>
        </div>
        <div className="w-[70%]">
          <img src={heroImg} className="w-full" alt="" />
        </div>
      </div>
      <div className="w-[30%]">
        <div>
          <div>
            <p>Natural Spice</p>
            <p>We are focusing on Natural spice</p>
          </div>
          <div></div>
        </div>
      </div>
    </section>
    // <section className="w-full bg-white flex flex-col md:flex-row gap-6">
    //   <div className="md:w-[70%] bg-cover bg-center h-64">
    //     <div className="flex bg-white">
    //       <button className="bg-white border border-grayish-blue flex items-center gap-2 px-2 py-1 rounded-full">
    //         <img src={star} alt="" />
    //         Seeds
    //       </button>
    //       <button className="bg-white border border-grayish-blue flex items-center gap-2 px-2 py-1 rounded-full">
    //         <img src={star} alt="" />
    //         Organic
    //       </button>
    //     </div>
    //     <h1 className="text-3xl pe-3 rounded-e-2xl    inline-block bg-white sm:text-4xl xl:text-5xl font-bold leading-tight ">
    //       <span className="text-green-600">PLUSES & SPICES</span>: FRESH
    //       <br />
    //     </h1>
    //     <h1 className="text-3xl pe-3 rounded-e-2xl    inline-block bg-white sm:text-4xl xl:text-5xl font-bold leading-tight ">
    //       FLAVOURS, <span className="text-green-600">ENDLESS</span>
    //     </h1>
    //     <h1 className="text-3xl pe-3 rounded-e-2xl    inline-block bg-white sm:text-4xl xl:text-5xl font-bold leading-tight ">
    //       POSSIBILITIES
    //     </h1>
    //     <div>
    //       <img src={heroImg} alt="" />
    //     </div>
    //   </div>
    //   <div className="md:w-[30%]"></div>
    // </section>
    // <section className="w-full bg-white pt-6 flex flex-col md:flex-row gap-6">
    //   {/* Left Column */}
    //   <div className="flex-1 flex flex-col justify-center max-w-xl">
    //     {/* Chips Row */}
    //     <div className="flex gap-2 mb-6">
    //       <div className="flex items-center gap-1 border rounded-full px-4 py-1 text-gray-700 text-sm bg-white shadow">
    //         <BsFillCheckCircleFill className="text-green-600" />
    //         Seeds
    //       </div>
    //       <div className="flex items-center gap-1 border rounded-full px-4 py-1 text-gray-700 text-sm bg-white shadow">
    //         <BsFillCheckCircleFill className="text-green-600" />
    //         Organic
    //       </div>
    //     </div>
    //     {/* Headline */}
    //     <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight mb-4">
    //       <span className="text-green-600">PLUSES & SPICES</span>: FRESH <br />
    //       FLAVOURS, <span className="text-green-600">ENDLESS</span> <br />
    //       POSSIBILITIES
    //     </h1>
    //     {/* Subtitle */}
    //     <p className="text-gray-500 mb-6">
    //       Revamp your best test buds with delightful experience
    //     </p>
    //     {/* Buttons */}
    //     <div className="flex gap-4 mb-12">
    //       <button className="bg-green-700 text-white px-8 py-3 rounded-full text-lg shadow hover:bg-green-800 transition">
    //         Shop Now
    //       </button>
    //       <button className="border border-black text-black px-8 py-3 rounded-full text-lg bg-white hover:bg-gray-100 transition">
    //         Explore
    //       </button>
    //     </div>
    //     {/* Chevron Down Circle */}
    //     <div className="flex items-center">
    //       <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center shadow">
    //         <FiChevronDown className="text-xl" />
    //       </div>
    //     </div>
    //   </div>

    //   {/* Main Image + Overlays (Center) */}
    //   <div className="relative flex-1 flex justify-center items-center">
    //     <img
    //       src={heroImg}
    //       alt="Coriander"
    //       className="rounded-3xl w-full max-w-lg shadow-lg object-cover"
    //     />
    //     {/* Purity Badge - bottom left over image */}
    //     <div className="absolute left-5 bottom-5 flex items-center gap-1 bg-white px-4 py-2 rounded-full shadow text-green-700 text-sm">
    //       <BsFillStarFill className="text-green-700" />
    //       Purity is our tradition
    //     </div>
    //     {/* Sales Card - top right over image */}
    //     <div className="absolute right-5 top-5 bg-white px-5 py-4 rounded-2xl shadow-md text-left">
    //       <div className="flex items-center justify-between mb-2">
    //         <span className="text-xl font-semibold">24K</span>
    //         <FiArrowUpRight className="text-gray-500" />
    //       </div>
    //       <div className="text-xs text-gray-400">Total Sale of Last Month</div>
    //     </div>
    //   </div>

    //   {/* Sidebar Card (Right on XL, below on mobile) */}
    //   <div className="flex flex-col md:w-72 xl:w-96 gap-4">
    //     <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
    //       <img
    //         src={naturalSpiceImg}
    //         alt="Natural Spice"
    //         className="w-full h-48 object-cover"
    //       />
    //       <div className="p-4">
    //         <div className="flex items-center gap-2 mb-2">
    //           <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
    //             <BsFillCheckCircleFill className="text-green-700" />
    //             Healthy
    //           </span>
    //         </div>
    //         <div className="font-semibold text-lg mb-1">Natural Spice</div>
    //         <div className="text-sm text-gray-500 mb-4">
    //           We are focusing on <br /> Natural spice
    //         </div>
    //         <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow text-gray-700 font-medium mt-2">
    //           <FiAward className="text-xl text-yellow-600" />
    //           17
    //           <span className="text-xs text-gray-400 ml-2">
    //             Winning Awards & Certificates
    //           </span>
    //           <FiArrowUpRight className="ml-auto text-gray-400" />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
