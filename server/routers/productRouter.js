import express from "express";
import { validateFields, validateParams } from "../middleware/validation.js";
import { upload } from "../middleware/multer.js";
import {
  addProduct,
  getAllFilters,
  getAllProducts,
  getNewProductsByCategory,
  getProductById,
} from "../controllers/productController.js";
const productRouter = express.Router();

productRouter.post(
  "/add",
  validateFields([
    "name",
    "price",
    "discountedPrice",
    "categoryId",
    "languageId",
  ]),
  upload.single("image"),
  addProduct
);
productRouter.get("/filters", getAllFilters);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", validateParams(["id"]), getProductById);
export default productRouter;
