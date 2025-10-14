import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongoose.js";
import userRouter from "./routers/userRouter.js";
const app = express();

app.use(express.json());
app.use(cors());

connectDb();
app.use("/auth", userRouter);
app.use("/", (req, res) => {
  res.send("api is working");
});

app.listen("4000", () => console.log("Server is started on 4000"));
