const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");

// Controller function to create a new comment
// Route: POST /api/comments
// Access: Private
const createComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  // Create a new comment
  const newComment = await Comment.create({
    comment,
    user: req.user._id, // Assuming you have authenticated the user and stored their ID in req.user
    ad: req.body.ad, // Assuming the ad ID is provided in the request body
  });

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

  await comment.remove();
  res.json({ message: "Comment removed" });
});

module.exports = { createComment, deleteComment };
