import FeaturedBlogs from "@/components/blog/FeaturedBlogs";
import FrontSection from "@/components/frontSection/FrontSection";
import React from "react";

const BlogPage = () => {
  return (
    <div className="space-y-10">
      <FrontSection
        imgUrl="/blog-header-img.png"
        title="Blogs"
        path="Home"
        subPath="Blog"
      />
      <FeaturedBlogs />
    </div>
  );
};

export default BlogPage;
