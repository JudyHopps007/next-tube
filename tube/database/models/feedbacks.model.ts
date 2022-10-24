import mongoose from 'mongoose';

const feedbacksSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Feedbacks =
  mongoose.models.Feedbacks || mongoose.model('Feedbacks', feedbacksSchema);

export default Feedbacks;
