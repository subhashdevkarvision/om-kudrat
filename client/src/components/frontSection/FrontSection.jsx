import React from "react";
import { useNavigate } from "react-router";

const FrontSection = ({ imgUrl, title, path, subPath }) => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div
        className="bg-cover rounded-3xl h-[304px]"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
      <div className=" bg-white rounded-tr-2xl pr-5 pt-2   bottom-0 left-0 absolute">
        <p className="font-belfast text-4xl text-Chinese-Black">{title}</p>
        <div className="flex items-center gap-2">
          <span onClick={() => navigate("/")}>{path}</span> <span>&gt;</span>{" "}
          <span>{subPath}</span>
        </div>
      </div>
    </div>
  );
};

export default FrontSection;
