import express from "express";
import { validateFields, validateParams } from "../middleware/validation.js";
import {
  createLanguage,
  deleteLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
} from "../controllers/languageController.js";

const languageRouter = express.Router();
languageRouter.post("/", validateFields(["name"]), createLanguage);
languageRouter.get("/", getAllLanguages);
languageRouter.get("/:id", validateParams(["id"]), getLanguageById);
languageRouter.put(
  "/:id",
  validateParams(["id"]),
  validateFields(["name"]),
  updateLanguage
);
languageRouter.delete("/:id", validateParams(["id"]), deleteLanguage);

export default languageRouter;
