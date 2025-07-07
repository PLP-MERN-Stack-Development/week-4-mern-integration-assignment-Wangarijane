const Category = require('../models/Category');

// GET /api/categories - Get all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({ categories }); // <-- wrap in object
  } catch (err) {
    next(err);
  }
};

// POST /api/categories - Create a new category
const createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};
