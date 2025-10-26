import express from "express";
import { validateFields, validateParams } from "../middleware/validation.js";
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
import userAuth from "../middleware/userAuth.js";
const wishlistRouter = express.Router();

wishlistRouter.get("/", userAuth, getUserWishlist);
wishlistRouter.post(
  "/",
  validateFields(["productId"]),
  userAuth,
  addToWishlist
);

wishlistRouter.delete(
  "/:productId",
  validateParams(["productId"]),
  userAuth,
  removeFromWishlist
);

export default wishlistRouter;
