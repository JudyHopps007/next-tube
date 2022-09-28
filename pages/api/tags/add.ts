import connectToDb from 'database/database';
import { addTag } from 'database/services/tags.service';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const tag = await addTag(req);
      return res.status(200).send(tag);
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'TAGS/ADD unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDb(handler);
