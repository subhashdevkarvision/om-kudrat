import express from "express";
import {
  getBestSellingProducts,
  getNewProductsByCategory,
} from "../controllers/productController.js";

const newProductRouter = express.Router();

newProductRouter.get("/products", getNewProductsByCategory);
newProductRouter.get("/best-selling", getBestSellingProducts);

export default newProductRouter;
