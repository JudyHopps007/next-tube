import mongoose from 'mongoose';

const actorsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: [true, 'lowecase(name) of actor is required.'],
      unique: true,
    },
    name: {
      type: String,
      require: [true, 'name of actor is required.'],
    },
    image: {
      type: String,
      default: '/images/placeholder-actor.png',
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
