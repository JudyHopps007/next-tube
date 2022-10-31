import mongoose from 'mongoose';
import Counter from './counter.model';

const videosSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'video id is required'],
      unique: true,
      min: 1,
    },
    title: {
      required: [true, 'title is required'],
      type: String,
      unique: true,
      trim: true,
    },
    thumbnail: {
      required: [true, 'thumbnail is required'],
      type: String,
    },
    poster: {
      required: [true, 'poster is required'],
      type: String,
    },
    alternativeTitle: {
      type: String,
      default: '',
      trim: true,
    },
    isHD: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      required: [true, 'duration is required'],
    },
    plattform: {
      type: String,
      required: [true, 'plattform is required'],
    },
    originalId: {
      type: String,
      required: [true, 'originalId is required'],
    },
    originalImage: {
      type: String,
      required: [true, 'originalImage is required'],
    },
    views: {
      type: Number,
      default: 1,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    tags: {
      default: [],
      type: [String],
    },
    categories: {
      default: [],
      type: [String],
    },
    models: {
      default: [],
      type: [String],
    },
    isUp: {
      default: true,
      type: Boolean,
    },
    lastUpCheck: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

videosSchema.pre('save', function (next) {
  var doc = this;
  Counter.findByIdAndUpdate(
    { _id: 'videos' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
    function (error, counter) {
      if (error) return next(error);
      doc.id = counter.seq;
      next();
    }
  );
});

videosSchema.index({
  title: 'text',
  alternativeTitle: 'text',
  tags: 'text',
  categories: 'text',
  models: 'text',
});

const Videos = mongoose.models.Videos || mongoose.model('Videos', videosSchema);

export default Videos;
