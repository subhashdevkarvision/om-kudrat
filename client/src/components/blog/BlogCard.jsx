import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const BlogCard = ({
  image,
  title,
  description,
  width,
  heigth,
  id,
  createdAt,
  titleSize,
  isReadMore = true,
  createdAtTextSize,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/blog/${id}`)}
      className="space-y-5 flex flex-col  cursor-pointer"
    >
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
        className={`rounded-3xl object-center object-cover w-full sm:${width} ${heigth}`}
        alt=""
      />
      <div className="flex flex-col flex-1 justify-between space-y-5">
        <div className="space-y-2.5">
          <h3 className={`text-Chinese-Black font-medium ${titleSize}`}>
            {title}
          </h3>
          <p className="text-Black-Olive text-sm">{description}</p>
          <p className={`text-Black-Olive ${createdAtTextSize}`}>
            {createdAt && <span>By Omkudrat.com </span>}
            {createdAt && <span>| </span>}
            <span>
              {createdAt
                ? new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </span>
          </p>
        </div>
        {isReadMore && (
          <Button variant="primary" className="w-fit font-medium">
            Read More
          </Button>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
