// server/controllers/commentController.js
const Comment = require("../models/Comment");

const getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { author, content } = req.body;
    const comment = new Comment({
      post: req.params.postId,
      author,
      content,
    });
    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCommentsByPost,
  addComment,
};
