import express from "express";
import { getTotalUserAndOrders } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", getTotalUserAndOrders);

export default dashboardRouter;
