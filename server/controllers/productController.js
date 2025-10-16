import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import languageModel from "../models/languageModel.js";
import mongoose from "mongoose";
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

      // Sort products by name before grouping
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

      // Sort categories by category name
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
    const { ids, language, minPrice, maxPrice, isFeatured, isBestSeller } =
      req.query;
    console.log(req.query);
    const matchCriteria = {};
    if (ids) {
      const idsArray = ids
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id));
      matchCriteria._id = { $in: idsArray };
    }
    if (language) {
      matchCriteria.languageId = new mongoose.Types.ObjectId(language);
    }
    if (minPrice || maxPrice) {
      matchCriteria.price = {};
      if (minPrice) {
        matchCriteria.price.$gte = Number(+language);
      }
      if (maxPrice) {
        matchCriteria.price.$lte = Number(+language);
      }
    }
    if (isFeatured !== undefined) {
      matchCriteria.isFeatured = isFeatured === "true";
    }
    if (isBestSeller !== undefined) {
      matchCriteria.isBestSeller = isBestSeller === "true";
    }
    console.log(matchCriteria);
    const products = await productModel.aggregate([
      { $match: matchCriteria },
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
      {
        $sort: { createdAt: -1 },
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
    ]);
    if (products.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "No product available" });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
