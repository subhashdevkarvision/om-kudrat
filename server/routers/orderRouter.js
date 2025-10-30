import express from "express";
import { getAllOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);

export default orderRouter;
