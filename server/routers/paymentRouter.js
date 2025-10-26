import express from "express";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import cartModel from "../models/cartModel.js";
import userAuth from "../middleware/userAuth.js";
import { validateFields } from "../middleware/validation.js";
const paymentRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

paymentRouter.post("/", userAuth, async (req, res) => {
  try {
    const { amount, cartItems, deliveryDetails } = req.body;
    const userId = req.user.id;
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount provided",
      });
    }
    const cart = cartItems.map((item) => ({
      productId: item.productId._id,
      qty: item.qty,
    }));
    const order = new orderModel({
      userId,
      cartItems: cart,
      totalAmount: amount,
      deliveryDetails,
    });
    await order.save();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      metadata: {
        id: order._id.toString(),
      },
    });
    res.status(201).json({
      success: true,
      message: "Payment intent created successfully",
      clientSecret: paymentIntent.client_secret,
      orderId: order._id,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// paymentRouter.get("/status", async (req, res) => {
//   console.log("webhook");
//   try {
//     const sig = req.headers["stripe-signature"];
//     const { data } = req.body;
//     if (data.object.status === "succeeded") {
//       const session = data.object;
//       const order = await orderModel.findById(session.metadata.id);
//       order.paymentStatus = "Paid";
//       order.stripePaymentIntentId = session.id;
//       await order.save();
//       await cartModel.deleteMany({ userId: order.userId });
//     }
//     return res.json({ success: true, message: "Order done", received: true });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });

paymentRouter.post("/status", async (req, res) => {
  console.log("Post webhook");
  try {
    const sig = req.headers["stripe-signature"];
    const { data } = req.body;
    if (data.object.status === "succeeded") {
      const session = data.object;
      const order = await orderModel.findById(session.metadata.id);
      order.paymentStatus = "Paid";
      order.stripePaymentIntentId = session.id;
      await order.save();
      await cartModel.deleteMany({ userId: order.userId });
    }
    return res.json({ success: true, message: "Order done", received: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

paymentRouter.put(
  "/",
  validateFields(["orderId", "billingDetails"]),
  async (req, res) => {
    try {
      const { orderId, billingDetails } = req.body;
      const order = await orderModel.findByIdAndUpdate(
        orderId,
        {
          billingDetails,
        },
        { new: true }
      );
      if (!order)
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      res
        .status(200)
        .json({ success: true, message: "Billing details updated" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default paymentRouter;
