import cartModel from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.user.id;
    const existingCart = await cartModel.findOne({ productId, userId });
    if (existingCart) {
      if (existingCart.qty > 0) {
        existingCart.qty += 1;
      }

      await existingCart.save();
      return res
        .status(200)
        .json({ success: true, message: "Product Quantity increased" });
    }
    const cart = new cartModel({ productId, userId, qty: 1 });
    await cart.save();
    return res
      .status(200)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// remove from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;
  try {
    const product = await cartModel.findOneAndDelete({ productId, userId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product is not available in cart" });
    }
    return res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
//  increament qty
export const increseQuantity = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  const userId = req.user.id;
  try {
    const product = await cartModel.findOne({ productId, userId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found in the cart" });
    }
    product.qty += 1;
    await product.save();
    return res
      .status(200)
      .json({ success: true, message: "increamented the quantity" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// decrement quantity
export const decrementQuantity = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;
  try {
    const product = await cartModel.findOne({ productId, userId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found for decreament" });
    }
    if (product.qty > 1) {
      product.qty -= 1;
      await product.save();
      return res
        .status(200)
        .json({ success: true, message: "decreamented the quantity" });
    } else {
      await cartModel.findOneAndDelete({ productId, userId });
      return res
        .status(200)
        .json({ success: true, message: "item removed from cart" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get user cart
export const getUserCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const userCart = await cartModel
      .find({ userId })
      .populate("productId", "name image price discountedPrice");
    return res.status(200).json({
      success: true,
      message: "cart fetched successfully",
      cartData: userCart.length > 0 ? userCart : [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
