// server/routes/comments.js
const express = require("express");
const router = express.Router();
const { getCommentsByPost, addComment } = require("../controllers/commentController");

router.get("/:postId", getCommentsByPost);
router.post("/:postId", addComment);

module.exports = router;
