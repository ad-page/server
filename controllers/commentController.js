const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const Ad = require("../models/adModel");

// Controller function to create a new comment
// Route: POST /api/comments
// Access: Private
const createComment = asyncHandler(async (req, res) => {
  const { comment, ad: adId } = req.body;

  // Create a new comment
  const newComment = await Comment.create({
    comment,
    user: req.user._id,
    ad: adId,
  });

  // Push the new comment into the ad's comments array
  const ad = await Ad.findById(adId);
  if (!ad) {
    res.status(404);
    throw new Error("Ad not found");
  }
  ad.comments.push(newComment._id);
  await ad.save();

  res.status(201).json(newComment);
});

// Controller function to delete a comment
// Route: DELETE /api/comments/:id
// Access: Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  // Check if the user owns the comment
  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized access");
  }

  await Comment.deleteOne({ _id: comment._id }); // Use deleteOne to remove the comment
  res.json({ message: "Comment removed" });
});

module.exports = { createComment, deleteComment };
