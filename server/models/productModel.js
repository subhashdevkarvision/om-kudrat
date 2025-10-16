import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    discountedPrice: { type: Number, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "language",
      required: true,
    },
    isBestSeller: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);
export default productModel;
