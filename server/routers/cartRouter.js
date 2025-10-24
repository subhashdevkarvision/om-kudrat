import express from "express";
import { validateFields, validateParams } from "../middleware/validation.js";
import userAuth from "../middleware/userAuth.js";
import {
  addToCart,
  decrementQuantity,
  getUserCart,
  increseQuantity,
  removeFromCart,
} from "../controllers/cartController.js";
const cartRouter = express.Router();
cartRouter.get("/", userAuth, getUserCart);
cartRouter.post(
  "/add-to-cart",
  userAuth,
  validateFields(["productId"]),
  addToCart
);
cartRouter.post(
  "/increase/:productId",
  userAuth,
  validateParams(["productId"]),
  increseQuantity
);
cartRouter.post(
  "/descrease/:productId",
  userAuth,
  validateParams(["productId"]),
  decrementQuantity
);
cartRouter.delete("/", userAuth, validateParams(["productId"]), removeFromCart);

export default cartRouter;
