import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { truncateString } from "@/api";

const OtherBlogs = ({ id }) => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/blog/other/${id}`
    );
    if (res.data.success) {
      console.log("blogs", res.data);
      setBlogs(res.data.data);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="space-y-7">
      <h3 className="font-belfast text-2xl text-Chinese-Black">Other Blogs</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {blogs.length &&
          blogs.map((b) => (
            <BlogCard
              key={b._id}
              id={b._id}
              title={b.title}
              titleSize="text-xl"
              description={truncateString(b.shortDescription, 40)}
              image={b.image}
              width="w-[304px]"
              heigth="h-[220px]"
            />
          ))}
      </div>
    </div>
  );
};

export default OtherBlogs;
