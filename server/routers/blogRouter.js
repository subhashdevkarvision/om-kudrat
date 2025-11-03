import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getOtherBlogs,
  updateBlog,
} from "../controllers/blogControler.js";
import { upload } from "../middleware/multer.js";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/other/:id", getOtherBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.post("/", upload.single("image"), addBlog);
blogRouter.put("/:id", upload.single("image"), updateBlog);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
