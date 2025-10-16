import mongoose from "mongoose";

const languageSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const languageModel = mongoose.model("language", languageSchema);
export default languageModel;
