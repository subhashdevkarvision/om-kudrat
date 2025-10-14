import mongoose, { model } from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: Number, default: null },
  otpExpires: { type: Date },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
