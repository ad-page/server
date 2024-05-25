const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

// Create a new category
// Route: POST /api/categories
// Access: Private
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please provide a category name");
  }

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({ name });

  if (category) {
    res.status(201).json(category);
  } else {
    res.status(400);
    throw new Error("Invalid category data");
  }
});

// Get all categories
// Route: GET /api/categories
// Access: Public
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Delete category by ID
// Route: DELETE /api/categories/:id
// Access: Private (assuming only admin can delete a category)
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.deleteOne({_id: req.params.id});
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

module.exports = { createCategory, getAllCategories, deleteCategory };
