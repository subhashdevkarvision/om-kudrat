import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const getDateRange = (filter) => {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  switch (filter) {
    case "today":
      return { start: startOfToday, end: now };
    case "weekly":
      return { start: startOfWeek, end: now };
    case "monthly":
      const past30 = new Date(now);
      past30.setDate(now.getDate() - 30);
      return { start: past30, end: now };
    case "thisMonth":
      return { start: startOfMonth, end: now };
    case "tillNow":
    default:
      return { start: new Date(0), end: now };
  }
};
export const getTotalUserAndOrders = async (req, res) => {
  try {
    const { filter = "today" } = req.query;
    const { start, end } = getDateRange(filter);
    const userCount = await userModel.countDocuments({
      createdAt: { $gte: start, $lte: end },
    });

    const orderCount = await orderModel.countDocuments({
      createdAt: { $gte: start, $lte: end },
    });

    res.status(200).json({
      success: true,
      data: {
        filter,
        totalUsers: userCount,
        totalOrders: orderCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
