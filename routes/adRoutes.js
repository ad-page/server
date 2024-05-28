const express = require("express");
const router = express.Router();
const {
  createAd,
  deleteAd,
  updateAd,
  getAllAds,
  getUserAds,
  likeAd,
} = require("../controllers/adController");
const { protect } = require("../middleware/authMiddleware");
const protectAdmin = require("../middleware/adminAuthMiddleware");

// Route for creating a new ad
router.post("/", protect, createAd);

// Route for deleting an ad
router.delete("/:id", protect, deleteAd);

// Route for updating an ad
router.put("/:id", protect, updateAd);

// Route for getting all ads
router.get("/", getAllAds);

// Route for getting ads created by the authenticated user
router.get("/my", protect, getUserAds);

// Route to like an ad
router.post("/:id/like", protect, likeAd);

module.exports = router;
