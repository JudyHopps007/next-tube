import { connectToDbHandler } from '@db/database';
import { addFeedback } from '@db/services/feedbacks.service';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      await addFeedback(req);
      return res.status(200).send({ success: true });
    }
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: `${err || 'Unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
