import express from "express";
import { validateFields } from "../middleware/validation.js";
import { upload } from "../middleware/multer.js";
import { addProduct, getAllFilters } from "../controllers/productController.js";
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
export default productRouter;
