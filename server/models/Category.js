const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name must be under 50 characters'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
