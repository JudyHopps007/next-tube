import { connectToDbHandler } from 'database/database';
import {
  getTag,
  removeTagById,
  updateTag,
} from 'database/services/tags.service';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;

    if (req.method === 'GET') {
      const tag = await getTag(id);
      return res.status(200).json(tag);
    }
    if (req.method === 'PATCH') {
      const tag = await updateTag(id, req.body);
      return res.status(200).send({ tag, message: 'tag updated' });
    }
    if (req.method === 'DELETE') {
      const tag = await removeTagById(id);
      return res.status(200).send({ message: 'tag deleted' });
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
