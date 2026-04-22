const Category = require("../models/Category");
const asyncHandler = require("../utils/asyncHandler");

const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create({ name: req.body.name });

  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

module.exports = { createCategory, getCategories };
