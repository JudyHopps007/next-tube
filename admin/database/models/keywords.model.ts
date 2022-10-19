import mongoose from 'mongoose';
import Counter from './counter.model';

const keywordsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'keyword id is required'],
      unique: true,
      min: 1,
    },
    name: {
      type: String,
      require: [true, 'name is required.'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['keyword', 'title'],
      default: 'keyword',
    },
    message: {
      type: String,
      default: 'Not parsed yet',
    },
    isParsed: { type: Boolean, default: false },
    videosCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

keywordsSchema.pre('save', function (next) {
  var doc = this;
  Counter.findByIdAndUpdate(
    { _id: 'keywords' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
    function (error, counter) {
      if (error) return next(error);
      doc.id = counter.seq;
      next();
    }
  );
});

const Keywords =
  mongoose.models.Keywords || mongoose.model('Keywords', keywordsSchema);

export default Keywords;
