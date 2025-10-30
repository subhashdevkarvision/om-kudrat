import orderModel from "../models/orderModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("cartItems.productId", "name image price") // ✅ populate product info
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};
