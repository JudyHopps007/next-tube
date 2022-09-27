import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      require: [true, 'Name of category is required.'],
    },
    image: {
      type: String,
      default: 'default-categrory.png',
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
