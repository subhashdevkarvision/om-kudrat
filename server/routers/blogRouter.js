import express from "express";
import {
  getAllBlogs,
  getBlogById,
  getOtherBlogs,
} from "../controllers/blogControler.js";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/other/:id", getOtherBlogs);
blogRouter.get("/:id", getBlogById);

export default blogRouter;
