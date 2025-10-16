import express from "express";
import { validateFields } from "../middleware/validation.js";
import { addCategory } from "../controllers/productController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", validateFields(["name"]), addCategory);

export default categoryRouter;
