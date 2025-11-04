import orderModel from "../models/orderModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const orders = await orderModel
      .find()
      .populate("cartItems.productId", "name image price")
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await orderModel.countDocuments();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
      pagination: {
        total,
        limit,
        page,
        pages: Math.ceil(total / limit),
      },
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
