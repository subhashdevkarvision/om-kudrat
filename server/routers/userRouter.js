import express from "express";
import { validateFields } from "../middleware/validation.js";
import { login, register } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post(
  "/register",
  validateFields(["email", "name", "password"]),
  register
);
userRouter.post("/login", validateFields(["email", "name", "password"]), login);

export default userRouter;
