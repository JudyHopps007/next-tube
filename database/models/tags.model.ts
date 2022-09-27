import mongoose from 'mongoose';

const tagsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      require: [true, 'Name of tag is required.'],
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
