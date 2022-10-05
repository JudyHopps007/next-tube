import { connectToDbHandler } from 'database/database';
import { removeTagById } from 'database/services/tags.service';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { id } = req.body;
      const tag = await removeTagById(id);
      return res.status(200).send({ message: 'tag deleted' });
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'TAGS/ADD unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
