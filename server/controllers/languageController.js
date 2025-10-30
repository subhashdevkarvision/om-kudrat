import languageModel from "../models/languageModel.js";

// ✅ Create Language
export const createLanguage = async (req, res) => {
  try {
    const { name } = req.body;

    // check if already exists
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

// ✅ Get All Languages
export const getAllLanguages = async (req, res) => {
  try {
    const languages = await languageModel.find();

    res.status(200).json({
      success: true,
      message: "Languages fetched successfully",
      data: languages,
    });
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ✅ Get Single Language by ID
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

// ✅ Update Language
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

// ✅ Delete Language
export const deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;

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
