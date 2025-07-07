const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getAllPosts,
  getPostById,
  createPost,
  getPostBySlug,
  updatePost,
  deletePost,
} = require('../controllers/postController');

// GET all posts
router.get('/', getAllPosts);

// GET post by slug
router.get('/slug/:slug', getPostBySlug);

// GET post by ID
router.get('/:id', getPostById);

// ✅ POST with image upload
router.post('/', upload.single('featuredImage'), createPost);

// PUT update post
router.put('/:id', updatePost);

// DELETE a post
router.delete('/:id', deletePost);

module.exports = router;

