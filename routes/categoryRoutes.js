const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories } = require("../controllers/categoryController");
const protectAdmin = require("../middleware/adminAuthMiddleware");

// Route for creating a category
router.post("/", protectAdmin, createCategory);

// Route for getting all categories
router.get("/", getAllCategories);

module.exports = router;
