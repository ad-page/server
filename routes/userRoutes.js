const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const protectAdmin = require("../middleware/adminAuthMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/:id", protect, getUser);
router.get("/", protectAdmin, getAllUsers);
router.delete("/:id", protectAdmin, deleteUser);

module.exports = router;
