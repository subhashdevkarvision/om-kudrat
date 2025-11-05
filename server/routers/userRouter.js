import express from "express";
import { validateFields } from "../middleware/validation.js";
import {
  forgotPassword,
  getAllUsers,
  getUser,
  login,
  register,
  resetPassword,
  verifyCode,
} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/user-detail", userAuth, getUser);
userRouter.post(
  "/register",
  validateFields(["email", "name", "password"]),
  register
);
userRouter.post("/login", validateFields(["email", "password"]), login);
userRouter.post("/send-email", validateFields(["email"]), forgotPassword);
userRouter.post("/verify-code", validateFields(["email", "otp"]), verifyCode);
userRouter.post(
  "/reset-password",
  validateFields(["email", "password"]),
  resetPassword
);

export default userRouter;
