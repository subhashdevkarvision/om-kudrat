import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    qty: { type: Number, required: true },
  },
  { timestamp: true }
);

const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
