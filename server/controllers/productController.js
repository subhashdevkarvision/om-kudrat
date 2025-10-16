import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import languageModel from "../models/languageModel.js";
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
      return (
        res.status(404),
        json({ success: false, message: "Filter not available" })
      );
    }
    res.status(200).json({
      success: true,
      message: "Fetched all filter products",
      data: filters,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
