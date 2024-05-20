const asyncHandler = require("express-async-handler");
const Ad = require("../models/adModel");
const Category = require("../models/categoryModel"); // Import Category model

// Controller function to create a new ad
// Route: POST /api/ads
// Access: Private
const createAd = asyncHandler(async (req, res) => {
  const { name, category, amount, description, images } = req.body;

  // Find the category by name
  const categoryObj = await Category.findOne({ name: category });

  // Check if category exists
  if (!categoryObj) {
    res.status(400);
    throw new Error("Category not found");
  }

  // Create a new ad
  const ad = await Ad.create({
    name,
    category: categoryObj._id,
    amount,
    description,
    user: req.user._id,
    images
  });

  res.status(201).json(ad);
});

// Controller function to delete an ad
// Route: DELETE /api/ads/:id
// Access: Private
const deleteAd = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    res.status(404);
    throw new Error("Ad not found");
  }

  // Check if the user owns the ad
  if (ad.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized access");
  }

  await ad.remove();
  res.json({ message: "Ad removed" });
});

// Controller function to update an ad
// Route: PUT /api/ads/:id
// Access: Private
const updateAd = asyncHandler(async (req, res) => {
  const { name, category, amount, description, images } = req.body;

  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    res.status(404);
    throw new Error("Ad not found");
  }

  // Check if the user owns the ad
  if (ad.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized access");
  }

  ad.name = name;
  ad.category = category;
  ad.amount = amount;
  ad.description = description;
  ad.images = images;

  const updatedAd = await ad.save();
  res.json(updatedAd);
});

// Controller function to get all ads
// Route: GET /api/ads
// Access: Public
const getAllAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find().populate("category").populate("user")
  res.json(ads);
});

// Controller function to get ads created by the authenticated user
// Route: GET /api/ads/my
// Access: Private
const getUserAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find({ user: req.user._id }).populate("category")
  res.json(ads);
});

module.exports = { createAd, deleteAd, updateAd, getAllAds, getUserAds };
