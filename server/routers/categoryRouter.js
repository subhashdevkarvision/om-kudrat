import express from "express";
import { validateFields, validateParams } from "../middleware/validation.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", validateParams(["id"]), getCategoryById);
categoryRouter.put(
  "/:id",
  validateFields(["name"]),
  validateParams(["id"]),
  updateCategory
);
categoryRouter.delete("/:id", validateParams(["id"]), deleteCategory);

export default categoryRouter;
