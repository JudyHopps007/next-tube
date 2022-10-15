import { connectToDbHandler } from '@db/database';
import { getTag, removeTagById, updateTag } from '@db/services/tags.service';
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
      return res.status(200).send({ tag, message: 'Tag updated' });
    }
    if (req.method === 'DELETE') {
      const tag = await removeTagById(id);
      return res.status(200).send({ message: 'Tag deleted' });
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'Unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
