import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema(
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
  },
  { timestamp: true }
);

const wishlistModel = mongoose.model("wishlist", wishlistSchema);
export default wishlistModel;
