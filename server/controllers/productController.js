import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import languageModel from "../models/languageModel.js";
import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
export const addProduct = async (req, res) => {
  try {
    const { name, price, discountedPrice, categoryId, languageId } = req.body;

    const image = req.file ? `uploads/${file.filename}` : null;
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const product = new productModel({
      name,
      price,
      discountedPrice,
      categoryId,
      languageId,
      image,
    });

    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Product added successfuly" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new categoryModel({
      name,
    });
    await category.save();
    res.status(201).json({ success: true, message: "Category added" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const addLanguage = async (req, res) => {
  try {
    const { name } = req.body;
    const language = new languageModel({
      name,
    });
    await language.save();
    res.status(201).json({ success: true, message: "language added" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllFilters = async (req, res) => {
  try {
    const filters = await productModel.aggregate([
      {
        $match: {
          price: { $gte: 10, $lte: 100 },
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },

      {
        $lookup: {
          from: "languages",
          localField: "languageId",
          foreignField: "_id",
          as: "language",
        },
      },
      { $unwind: "$language" },

      { $sort: { name: 1 } },

      {
        $group: {
          _id: "$category.name",
          products: {
            $push: {
              _id: "$_id",
              name: "$name",
            },
          },
          allLanguages: {
            $addToSet: {
              id: "$language._id",
              name: "$language.name",
            },
          },
        },
      },

      { $sort: { _id: 1 } },

      {
        $group: {
          _id: null,
          categories: {
            $push: {
              categoryName: "$_id",
              products: "$products",
            },
          },
          languages: {
            $addToSet: "$allLanguages",
          },
        },
      },

      {
        $project: {
          _id: 0,
          categories: 1,
          languages: {
            $reduce: {
              input: "$languages",
              initialValue: [],
              in: { $setUnion: ["$$value", "$$this"] },
            },
          },
        },
      },
    ]);

    if (!filters) {
      return res
        .status(404)
        .json({ success: false, message: "Filter not available" });
    }
    res.status(200).json({
      success: true,
      message: "Fetched all filter products",
      filters,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const {
      searchTerm,
      ids,
      language,
      minPrice,
      maxPrice,
      isFeatured,
      isBestSeller,
      sort,
    } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = 9;

    const skip = (page - 1) * limit;
    const matchCriteria = {};
    if (ids) {
      const idsArray = ids
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id));
      matchCriteria._id = { $in: idsArray };
    }
    if (searchTerm) {
      matchCriteria.name = { $regex: searchTerm, $options: "i" };
    }
    if (language) {
      const languageArray = language
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id));
      matchCriteria.languageId = { $in: languageArray };
    }
    if (minPrice || maxPrice) {
      matchCriteria.discountedPrice = {};
      if (minPrice) {
        matchCriteria.discountedPrice.$gte = Number(+minPrice);
      }
      if (maxPrice) {
        matchCriteria.discountedPrice.$lte = Number(+maxPrice);
      }
    }
    if (isFeatured !== undefined) {
      matchCriteria.isFeatured = isFeatured === "true";
    }
    if (isBestSeller !== undefined) {
      matchCriteria.isBestSeller = isBestSeller === "true";
    }
    let sortStage = {};
    switch (sort) {
      case "low-high":
        sortStage = { discountedPrice: 1 };
        break;
      case "high-low":
        sortStage = { discountedPrice: -1 };
        break;
      case "newest":
        sortStage = { createdAt: -1 };
        break;
      default:
        sortStage = { createdAt: 1 };
        break;
    }
    const products = await productModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "languages",
          localField: "languageId",
          foreignField: "_id",
          as: "language",
        },
      },
      { $unwind: "$language" },
      { $match: matchCriteria },
      {
        $sort: sortStage,
      },
      {
        $project: {
          name: 1,
          price: 1,
          discountedPrice: 1,
          image: 1,
          isFeatured: 1,
          isBestSeller: 1,
          category: "$category.name",
          language: "$language.name",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);
    const totalProducts = await productModel.countDocuments(matchCriteria);
    const totalPages = Math.ceil(totalProducts / limit);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products available" });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      page,
      totalPages,
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel
      .findById(id)
      .populate("categoryId", "name");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product details fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNewProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const limit = 8;

    let filter = {};

    if (category && category.toLowerCase() !== "all") {
      const categoryDoc = await categoryModel.findOne({
        name: category,
      });

      if (categoryDoc) {
        filter.categoryId = categoryDoc._id;
      } else {
        return res.status(404).json({
          success: false,
          message: "Category not found",
          products: [],
        });
      }
    }

    const newProducts = await productModel
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("categoryId", "name");

    res.status(200).json({
      success: true,
      message: "New products fetched successfully",
      products: newProducts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getBestSellingProducts = async (req, res) => {
  try {
    const bestSellingProducts = await orderModel.aggregate([
      { $unwind: "$cartItems" },
      {
        $group: {
          _id: "$cartItems.productId",
          totalqty: { $sum: "$cartItems.qty" },
        },
      },
      { $sort: { totalqty: -1 } },
      { $limit: 4 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "result",
        },
      },
      { $unwind: "$result" },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$result", { totalqty: "$totalqty" }],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Top 5 best selling products",
      products: bestSellingProducts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
