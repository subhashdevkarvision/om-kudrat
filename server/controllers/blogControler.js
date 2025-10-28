// export const addBlog = async (req, res) => {
//   try {
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }

import blogModel from "../models/blogModel.js";

// };
export const getAllBlogs = async (req, res) => {
  try {
    // Pagination
    const page = Number(req.query.page);
    const limit = Number(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    // Sorting
    const sortOption = req.query.sort || "default";
    let sort = {};
    if (sortOption === "latest") sort = { createdAt: -1 };
    else if (sortOption === "a-z") sort = { title: 1 };
    else if (sortOption === "z-a") sort = { title: -1 };
    else sort = { _id: 1 }; // default

    // Query
    const blogs = await blogModel.find().sort(sort).skip(skip).limit(limit);

    // Total Count
    const total = await blogModel.countDocuments();

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        limit,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getOtherBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit) || 4;
    const blogs = await blogModel.find({ _id: { $ne: id } }).limit(limit);
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
