const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
// const { setAd } = require("../controllers/adController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
// router.route("/").post(protect, setAd);

module.exports = router;