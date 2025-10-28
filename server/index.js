import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongoose.js";
import userRouter from "./routers/userRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import languageRouter from "./routers/languageRouter.js";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";
import paymentRouter from "./routers/paymentRouter.js";
import contactRouter from "./routers/contactRouter.js";
import wishlistRouter from "./routers/wishlistRouter.js";
import newProductRouter from "./routers/newProductsRouter.js";
import blogRouter from "./routers/blogRouter.js";
const app = express();

app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

app.use(cors());

connectDb();
app.use("/payment", paymentRouter);
app.use("/auth", userRouter);
app.use("/product", productRouter);
app.use("/", newProductRouter);
app.use("/category", categoryRouter);
app.use("/language", languageRouter);
app.use("/cart", cartRouter);
app.use("/contact", contactRouter);
app.use("/wishlist", wishlistRouter);
app.use("/blog", blogRouter);
app.use("/", (req, res) => {
  res.send("api is working");
});

app.listen("4000", () => console.log("Server is started on 4000"));
