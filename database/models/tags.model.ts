import mongoose from 'mongoose';

const tagsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: [true, 'lowecase(name) of tag is required.'],
      unique: true,
    },
    name: {
      type: String,
      require: [true, 'name of tag is required.'],
    },
    relatedTags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Tags = mongoose.models.Tags || mongoose.model('Tags', tagsSchema);

export default Tags;
