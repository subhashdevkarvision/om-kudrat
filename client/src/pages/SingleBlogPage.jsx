import { axiosInstance } from "@/api";
import BlogComments from "@/components/blog/BlogComments";
import OtherBlogs from "@/components/blog/OtherBlogs";
import FrontSection from "@/components/frontSection/FrontSection";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const SingleBlogPage = () => {
  const [blog, setBlog] = useState([]);
  const { id } = useParams();
  const getBlogById = async () => {
    const { data } = await axiosInstance.get(`/blog/${id}`);
    if (data.success) {
      setBlog(data.data);
    }
  };
  useEffect(() => {
    getBlogById();
  }, [id]);
  return (
    <div className="font-poppins space-y-8">
      <FrontSection
        imgUrl="/single-blog-header-img.png"
        title="Blogs Detail"
        path="Home"
        subPath="Blog"
      />
      <div className="space-y-7">
        <div className="space-y-3.5">
          <h1 className="font-belfast text-4xl text-Chinese-Black">
            {blog.title}
          </h1>
          <p className="text-Black-Olive">
            <span>By Omkudrat.com </span>
            <span>| </span>
            <span>
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </span>
          </p>
        </div>
        <div
          className="space-y-7"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
      <BlogComments />
      <OtherBlogs id={id} />
    </div>
  );
};

export default SingleBlogPage;
