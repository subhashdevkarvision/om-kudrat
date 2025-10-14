import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import transporter from "../config/nodemailer.js";

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
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
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
      return res.status(401).json({
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      authenticationKey: token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpires = Date.now() + 15 * 60 * 1000;

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <p>You requested to reset your password.</p>
        <p>Your OTP: <b>${otp}</b></p>
        <p>This OTP will expire in 15 minutes.</p>
        <a href="http://localhost:5173/auth/verify-code?email=${encodeURIComponent(
          email
        )}" style="display:inline-block; padding:10px 20px; background:#4CAF50; color:#fff; text-decoration:none;">Reset Password</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "OTP emailed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
