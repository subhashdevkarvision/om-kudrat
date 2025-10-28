import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const FromOurBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/blog/?limit=3`
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
    <div>
      <div className="flex flex-wrap gap-5 md:justify-between">
        <h4 className="font-belfast text-Chinese-Black text-4xl">
          From Our Blog
        </h4>
        <p className="text-Black-Olive text-right text-lg max-w-3xl">
          Explore our blog to discover the benefits of various spices, gardening
          tips, and delicious recipes that showcase the vibrant tastes of our
          products.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-7">
        {blogs.length &&
          blogs.map((b) => (
            <BlogCard
              key={b._id}
              title={b.title}
              titleSize="text-2xl"
              image={b.image}
              width="w-[412px]"
              heigth="h-[368px]"
              createdAt={b.createdAt}
              isReadMore={false}
            />
          ))}
      </div>
    </div>
  );
};

export default FromOurBlog;
