import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: [true, 'lowecase(name) of category is required.'],
      unique: true,
    },
    name: {
      type: String,
      require: [true, 'name of category is required.'],
    },
    image: {
      type: String,
      default: '/images/placeholder-category.png',
    },
    videoCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Categories =
  mongoose.models.Categories || mongoose.model('Categories', categoriesSchema);

export default Categories;
