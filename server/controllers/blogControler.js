import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import path from "path";
import { existsSync, unlinkSync } from "fs";
const __dirname = path.resolve();

export const getAllBlogs = async (req, res) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const sortOption = req.query.sort || "default";
    let sort = {};
    if (sortOption === "latest") sort = { createdAt: -1 };
    else if (sortOption === "a-z") sort = { title: 1 };
    else if (sortOption === "z-a") sort = { title: -1 };
    else sort = { _id: 1 };

    const blogs = await blogModel.find().sort(sort).skip(skip).limit(limit);

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

export const addBlog = async (req, res) => {
  try {
    console.log(req.body);
    const { title, shortDescription, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const blog = new blogModel({
      title,
      shortDescription,
      content,
      image,
    });

    await blog.save();

    res.status(201).json({ success: true, message: "Blog added successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Blog Id",
      });
    }

    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const { title, shortDescription, content } = req.body;

    const updatedFields = {};

    if (title) updatedFields.title = title;
    if (shortDescription) updatedFields.shortDescription = shortDescription;
    if (content) updatedFields.content = content;

    if (req.file) {
      if (blog.image) {
        const oldImagePath = path.resolve(
          __dirname,
          "public",
          "uploads",
          path.basename(blog.image)
        );

        if (existsSync(oldImagePath)) {
          unlinkSync(oldImagePath);
        }
      }

      updatedFields.image = `/uploads/${req.file.filename}`;
    }

    await blogModel.findByIdAndUpdate(id, { $set: updatedFields });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog ID" });
    }

    const blog = await blogModel.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (blog.image) {
      const imagePath = path.resolve(
        __dirname,
        "public",
        blog.image.replace(/^\//, "")
      );

      if (existsSync(imagePath)) {
        unlinkSync(imagePath);
      }
    }

    await blogModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting blog",
    });
  }
};
