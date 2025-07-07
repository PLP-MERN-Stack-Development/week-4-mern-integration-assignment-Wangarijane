const slugify = require('slugify');
const Post = require('../models/Post');

// GET /api/posts - Get all posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ isPublished: true }).populate('author category');
    res.json({ success: true, posts });
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/:id - Get a single post
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author category');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// POST /api/posts - Create new post
const createPost = async (req, res, next) => {
  try {
    const { title, content, category, isPublished } = req.body;
    const slug = slugify(title, { lower: true });

    const post = new Post({
      title,
      slug,
      content,
      category,
      isPublished: isPublished === 'true',
      featuredImage: req.file ? req.file.filename : 'default-post.jpg',
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/slug/:slug - Get post by slug
const getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate('author category');
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// PUT /api/posts/:id - Update a post
const updatePost = async (req, res, next) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/posts/:id - Delete a post
const deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,     
  deletePost,     
  getPostBySlug,
};
