import mongoose from 'mongoose';
import Counter from './counter.model';

const videosSchema = new mongoose.Schema(
  {
    vid: {
      type: Number,
      required: [true, 'video id is required'],
      unique: true,
      min: 1,
    },
    title: {
      required: [true, 'title is required'],
      type: String,
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
    hd: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      required: [true, 'duration is required'],
    },
    views: {
      type: Number,
      default: 0,
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
    actors: {
      default: [],
      type: [String],
    },
  },
  { timestamps: true }
);

const Videos = mongoose.models.Videos || mongoose.model('Videos', videosSchema);

videosSchema.pre('save', function (next) {
  var doc = this;
  Counter.findByIdAndUpdate(
    { _id: 'videos' },
    { $inc: { seq: 1 } },
    function (error, counter) {
      if (error) return next(error);
      doc.vid = counter.seq;
      next();
    }
  );
});

export default Videos;
