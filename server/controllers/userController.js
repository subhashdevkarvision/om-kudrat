import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exstingUser = await userModel.findOne({ email });
    if (exstingUser) {
      return res.status(401).json({
        success: false,
        message: "user email already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ id: newUser._id }, { expireIn: "7d" });
    return res.status(200).json({
      success: true,
      message: "Register successfully",
      authenticationKey: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status.json({
        success: false,
        message: "user email is not registerd",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: user._id }, { expireIn: "7d" });
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      authenticationKey: token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
