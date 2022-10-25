import mongoose from 'mongoose';
import Counter from './counter.model';

const feedbacksSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'feedback id is required'],
      unique: true,
      min: 1,
    },
    message: {
      type: String,
      require: [true, 'message of feedback is required.'],
    },
    email: {
      type: String,
      require: [true, 'email of feedback is required.'],
    },
    subject: {
      type: String,
      enum: ['copyright', 'age', 'broken', 'other'],
      default: 'copyright',
      require: true,
    },
    hasSeen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

feedbacksSchema.pre('save', function (next) {
  var doc = this;
  Counter.findByIdAndUpdate(
    { _id: 'feedbacks' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
    function (error, counter) {
      if (error) return next(error);
      doc.id = counter.seq;
      next();
    }
  );
});

const Feedbacks =
  mongoose.models.Feedbacks || mongoose.model('Feedbacks', feedbacksSchema);

export default Feedbacks;
