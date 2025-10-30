import express from "express";
import { validateFields, validateParams } from "../middleware/validation.js";
import {
  createLanguage,
  deleteLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
} from "../controllers/languageController.js";
// import { addLanguage } from "../controllers/productController.js";

const languageRouter = express.Router();

languageRouter.post("/", validateFields(["name"]), createLanguage);

// ✅ Get All Languages
languageRouter.get("/", getAllLanguages);

// ✅ Get Language by ID
languageRouter.get("/:id", validateParams(["id"]), getLanguageById);

// ✅ Update Language (requires "id" + "name")
languageRouter.put(
  "/:id",
  validateParams(["id"]),
  validateFields(["name"]),
  updateLanguage
);

// ✅ Delete Language (requires "id")
languageRouter.delete("/:id", validateParams(["id"]), deleteLanguage);

export default languageRouter;
