import express from "express";
import { validateFields, validateParams } from "../middleware/validation.js";
import { upload } from "../middleware/multer.js";
import {
  addProduct,
  deleteProduct,
  getAllFilters,
  getAllProducts,
  getNewProductsByCategory,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/filters", getAllFilters);
productRouter.get("/", getAllProducts);
productRouter.get("/all-products", getProducts);
productRouter.get("/:id", validateParams(["id"]), getProductById);
productRouter.put("/:id", upload.single("image"), updateProduct);
productRouter.delete("/:id", deleteProduct);
export default productRouter;
