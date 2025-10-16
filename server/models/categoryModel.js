import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
