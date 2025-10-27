import wishlistModel from "../models/wishlistModel.js";
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;
    const existing = await wishlistModel.findOne({ productId, userId });
    if (existing) {
      const wishlist = await wishlistModel.findOneAndDelete({
        productId,
        userId,
      });
      return res
        .status(200)
        .json({ success: true, message: "Product is removed from wishlist" });
    }
    const wishlist = new wishlistModel({ productId, userId });
    await wishlist.save();
    return res.status(200).json({
      success: true,
      message: "Product added successfully in wishlist",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;
  try {
    const product = await wishlistModel.findOneAndDelete({ productId, userId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product is not available in wishlist",
      });
    }
    return res.status(200).json({
      success: true,
      message: "product successfully removed from wishlist",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    const userWishlist = await wishlistModel
      .find({ userId })
      .populate("productId", "name image discountedPrice");
    return res.status(200).json({
      success: true,
      message: "wishlist fetched successfully",
      wishlistData: userWishlist.length > 0 ? userWishlist : [],
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
