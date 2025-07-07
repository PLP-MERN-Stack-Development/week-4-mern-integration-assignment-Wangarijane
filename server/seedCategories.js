const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');

dotenv.config();

const categories = [
  { name: 'Health' },
  { name: 'Education' },
  { name: 'Programming' },
  { name: 'Lifestyle' },
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log('✅ Categories seeded!');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Error seeding categories:', err);
    process.exit(1);
  });
