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
      trim: true,
    },
    role: {
      type: String,
      enum: ['category', 'tag', 'model'],
      default: 'tag',
    },
    image: {
      type: String,
      default: '',
    },
    originalImage: {
      type: String,
      default: '',
    },
    isPriority: { type: Boolean, default: false },
    isParsed: { type: Boolean, default: false },
    videoCount: {
      type: Number,
      default: 0,
    },
    relatedTags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

tagsSchema.index({ name: 'text' });

const Tags = mongoose.models.Tags || mongoose.model('Tags', tagsSchema);

export default Tags;
