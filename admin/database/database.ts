import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const connectToDb = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  await mongoose.connect(
    `mongodb://localhost:27017/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
};

export const connectToDbHandler =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDb();
    return handler(req, res);
  };
