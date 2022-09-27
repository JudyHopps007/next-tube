import mongoose from 'mongoose';

const actorsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      require: [true, 'Name of actor is required.'],
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

const Actors = mongoose.models.Actors || mongoose.model('Actors', actorsSchema);

export default Actors;
