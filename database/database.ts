import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const connectToDb =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }

    await mongoose.connect(
      `mongodb://localhost:27017/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    return handler(req, res);
  };

export default connectToDb;
