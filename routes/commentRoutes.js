const express = require('express');
const router = express.Router();
const {
  createComment,
  deleteComment,
  getCommentsByAdId,
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// Route for creating a new comment
router.post('/', protect, createComment);

router.get('/ad/', getCommentsByAdId);

// Route for deleting a comment
router.delete('/:id', protect, deleteComment);

module.exports = router;
