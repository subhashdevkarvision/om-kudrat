import languageModel from "../models/languageModel.js";
import productModel from "../models/productModel.js";

export const createLanguage = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await languageModel.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Language already exists",
      });
    }

    const language = await languageModel.create({ name: name.trim() });

    res.status(201).json({
      success: true,
      message: "Language created successfully",
      data: language,
    });
  } catch (error) {
    console.error("Error creating language:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllLanguages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const languages = await languageModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await languageModel.countDocuments();
    res.status(200).json({
      success: true,
      message: "Languages fetched successfully",
      data: languages,
      pagination: {
        total,
        limit,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getLanguageById = async (req, res) => {
  try {
    const { id } = req.params;

    const language = await languageModel.findById(id);
    if (!language) {
      return res.status(404).json({
        success: false,
        message: "Language not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Language fetched successfully",
      data: language,
    });
  } catch (error) {
    console.error("Error fetching language:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await languageModel.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Language not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Language updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating language:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const linkedProducts = await productModel
      .find({
        languageId: id,
      })
      .select(
        "-_id -price -image -discountedPrice -categoryId -languageId -isBestSeller -isFeatured -isDealOfTheWeek -createdAt -updatedAt -__v"
      );
    if (linkedProducts.length > 0) {
      return res.status(409).json({
        success: false,
        message: "This Language is linked with products and cannot be deleted.",
        linkedProducts,
      });
    }

    const deleted = await languageModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Language not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Language deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting language:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
