import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blog", BlogSchema);

export default blogModel;
