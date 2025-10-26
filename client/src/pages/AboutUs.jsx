import FrontSection from "@/components/frontSection/FrontSection";
import React from "react";
import image from "../assets/about-us-img.png";
import IconBadge from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import ingradient from "../assets/ingradient.png";
import organic from "../assets/organic.png";
import checker from "../assets/checker.png";
import healthy from "../assets/healthy.png";
import product1 from "../assets/about-us-product1.png";
import product2 from "../assets/about-us-product2.png";
import product3 from "../assets/about-us-product3.png";
import product4 from "../assets/about-us-product4.png";
import bgImage from "../assets/about-image.png";
import FaqsComponent from "@/components/faqs/FaqsComponent";
import ServiceHighlights from "@/components/serviceHighlights/ServiceHighlights";
import trophy from "../assets/trophy.svg";
import user from "../assets/user.svg";
import rating from "../assets/rating.svg";
import pistachio from "../assets/pistachio.svg";

const AboutUs = () => {
  const card = [
    {
      vector: ingradient,
      image: product1,
      title: "Natural ingredients",
      subtitle:
        "Quis enim lobortis scelerisque fermentum. Dolor sit amet consectetur adip RamAgree",
    },
    {
      vector: organic,
      image: product2,
      title: "100% Pure organic",
      subtitle:
        "Amet risus nullam eget felis eget nunc lobortis mattis aliquam elementum sagitt",
    },
    {
      vector: checker,
      image: product3,
      title: "Experienced Test-checker",
      subtitle:
        "Nec sagittis aliquam malesuada bibendum arcu vitae elementum sit amet nisl purus in",
    },
    {
      vector: healthy,
      image: product4,
      title: "Healthiest Product",
      subtitle:
        "Quis enim lobortis scelerisque fermentum. Dolor sit amet consectetur adip RamAgree",
    },
  ];
  const features = [
    {
      icon: <img src={pistachio} />,
      title: "120+",
      subtitle: "Pulses & Spices",
    },
    {
      icon: <img src={user} />,
      title: "400+",
      subtitle: "Customer Weekly",
    },
    {
      icon: <img src={rating} />,
      title: "25+",
      subtitle: "Years of Experience",
    },
    {
      icon: <img src={trophy} />,
      title: "65+",
      subtitle: "Awards Winning",
    },
  ];
  return (
    <div className="space-y-10">
      <FrontSection
        imgUrl="/about-us-header.png"
        title="About Us"
        path="Home"
        subPath="About us"
      />
      {/* We Are Natural & Healthy. */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10 xl:gap-36 sm:items-center ">
        <div className="space-y-10">
          <div className="space-y-4">
            <IconBadge title="About Om Kudrat" />
            <h3 className="font-belfast text-4xl">
              We Are<span className="text-text-green"> Natural</span> <br />&
              <span className="text-text-green"> Healthy</span> .
            </h3>
            <hr className="bg-grayish-blue w-28 h-[2px]" />
            <p className="text-Black-Olive">
              Om kudrat is the best place to buy premium quality dry fruits
              online. At Om kudrat, we aim to provide the best quality dry
              fruits, nuts, and seeds. Along with this we also make sure that
              only the best product reaches our customers. Each product of Om
              kudrat is handpicked and purely natural. Such efforts of Om
              kudrat, establish a benchmark of credibility among its customers,
              making it the best place to buy dry fruits online in India.
            </p>
            <p>
              Being the best healthy snack store online, Om kudrat comes up with
              a wide range of dry fruits, nuts, and seeds.
            </p>
          </div>
          <Button
            variant="primary"
            className="font-medium w-fit rounded-full text-sm"
          >
            Read More
          </Button>
        </div>
        <div className="relative">
          <img src={image} alt="" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="p-4 bg-[#00000080] text-center text-white max-w-36 rounded-3xl border border-[#FFFFFF] backdrop-blur-xl">
              <p className="font-belfast text-2xl mb-2">25+</p>
              <p className="font-poppins font-normal text-xs">
                Years Of Experience
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* product details  */}
      <div>
        <ServiceHighlights FEATURES={features} />
      </div>
      {/* Why People choose Us */}
      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="space-y-4">
            <IconBadge title="Choose Om Kudrat" />
            <h3 className="font-belfast text-4xl">
              Why
              <span className="text-text-green"> People choose</span> Us
            </h3>
          </div>
          <p className="text-Black-Olive sm:text-right my-4">
            “While growing up, I have seen my father selecting only the best of
            Pluses and Spices to be packaged and sold, his motto has always been
            providing best quality and making sure only best products reach to
            the customers.”
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {card.length &&
            card.map((item, id) => (
              <div
                key={id}
                className="bg-[#F8F8F8] relative flex gap-7 rounded-3xl p-10 overflow-hidden"
              >
                <img src={item.vector} className="size-16 z-10" alt="" />
                <div className="space-y-2.5 z-10">
                  <p className="text-2xl text-text-green font-medium">
                    {item.title}
                  </p>
                  <p className="text-black sm:text-Black-Olive text-sm">
                    {item.subtitle}
                  </p>
                </div>
                <img
                  src={item.image}
                  className="absolute blur-md sm:blur-none  md:-right-[25%] lg:-right-[8%] xl:-right-[6%]  top-0 w-auto h-full object-cover"
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
      {/* faqs  */}
      <div className="flex flex-col sm:justify-between  sm:flex-row">
        <div className="w-full flex flex-col justify-between sm:w-[30%] space-y-4">
          <div>
            <IconBadge title="About Om Kudrat" />
            <h3 className="font-belfast text-4xl">
              We Are<span className="text-text-green"> Natural</span> <br />&
              <span className="text-text-green"> Healthy</span> .
            </h3>
          </div>
          <div>
            <img src={bgImage} alt="" />
          </div>
        </div>
        <div className="w-full sm:w-[50%]">
          <FaqsComponent />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
