const asyncHandler = require("express-async-handler");
const Ad = require("../models/adModel");
const Category = require("../models/categoryModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

// Controller function to create a new ad
// Route: POST /api/ads
// Access: Private
const createAd = asyncHandler(async (req, res) => {
  const { name, category, price, description, images } = req.body;

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
    price,
    description,
    user: req.user._id,
    images,
  });

  res.status(201).json(ad);
});

// Controller function to delete an ad
// Route: DELETE /api/ads/:id
// Access: Private
const deleteAd = asyncHandler(async (req, res) => {
  const adId = req.params.id;

  // Find the ad by ID
  const ad = await Ad.findById(adId);

  if (!ad) {
    res.status(404);
    throw new Error("Ad not found");
  }

  // Check if the user owns the ad
  // if (ad.user.toString() !== req.user._id.toString()) {
  //   res.status(403);
  //   throw new Error("Unauthorized access");
  // }

  try {
    // Delete comments associated with the ad
    await Comment.deleteMany({ ad: adId });

    // Delete the ad
    await Ad.findByIdAndDelete(adId);

    res.json({ message: "Ad removed successfully" });
  } catch (error) {
    console.error("Error while deleting ad:", error);
    res
      .status(500)
      .json({ message: "Error while deleting ad", error: error.message });
  }
});

// Controller function to update an ad
// Route: PUT /api/ads/:id
// Access: Private
const updateAd = asyncHandler(async (req, res) => {
  const { name, category, price, description, images } = req.body;

  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    res.status(404);
    throw new Error("Ad not found");
  }

  // Check if the user owns the ad
  // if (ad.user.toString() !== req.user._id.toString()) {
  //   res.status(403);
  //   throw new Error("Unauthorized access");
  // }

  ad.name = name;
  ad.category = category;
  ad.price = price;
  ad.description = description;
  ad.images = images;

  const updatedAd = await ad.save();
  res.json(updatedAd);
});

// Controller function to get all ads
// Route: GET /api/ads
// Access: Public
const getAllAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find()
    .populate("category")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    });

  res.json(ads);
});

// Controller function to like an ad
// Route: POST /api/ads/:id/like
// Access: Private
const likeAd = asyncHandler(async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      res.status(404).send("Ad not found");
      return;
    }

    if (!ad.likes.includes(req.user._id)) {
      ad.likes.push(req.user._id);
      await ad.save();

      const user = await User.findById(req.user._id);
      user.likes.push(ad._id);
      await user.save();

      res.status(200).send("Ad liked");
    } else {
      res.status(400).send("You have already liked this ad");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Controller function to get ads created by the authenticated user
// Route: GET /api/ads/my
// Access: Private
const getUserAds = asyncHandler(async (req, res) => {
  try {
    // Find ads created by the authenticated user
    const ads = await Ad.find({ user: req.user._id }).populate("category");
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = {
  createAd,
  deleteAd,
  updateAd,
  getAllAds,
  getUserAds,
  likeAd,
};
