import express from "express";
import { validateFields } from "../middleware/validation.js";
import { addLanguage } from "../controllers/productController.js";

const languageRouter = express.Router();

languageRouter.post("/", validateFields(["name"]), addLanguage);

export default languageRouter;
