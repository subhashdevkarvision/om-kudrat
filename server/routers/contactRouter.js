import express from "express";
import contactModel from "../models/contactModel.js";
import { validateFields } from "../middleware/validation.js";
const contactRouter = express.Router();

contactRouter.post(
  "/",
  validateFields(["name", "email", "message"]),
  async (req, res) => {
    try {
      const { name, email, message } = req.body;

      const newContact = new contactModel({ name, email, message });
      await newContact.save();

      res
        .status(201)
        .json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

export default contactRouter;
