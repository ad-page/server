const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add username"],
    },
    email: {
      type: String,
      required: [true, "please add email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
    },
    role: {
      type: String,
      default: "simple",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);