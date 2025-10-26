import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  email: String,
  houseNumStreetName: String,
  apartment: String,
  city: String,
  postCode: String,
  country: String,
  additionalDetails: String,
  shippingMethod: Boolean,
});
const orderSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    cartItems: [
      {
        _id: false,
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          required: true,
        },
        qty: Number,
      },
    ],
    totalAmount: { type: Number, required: true },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending",
    },
    stripePaymentIntentId: { type: String },
    deliveryDetails: addressSchema,
    billingDetails: addressSchema,
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
