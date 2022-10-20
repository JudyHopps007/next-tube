import { connectToDbHandler } from '@db/database';
import {
  getKeyword,
  removeKeywordById,
  updateKeyword,
} from '@db/services/keywords.service';
import { NextApiRequest, NextApiResponse } from 'next';
import { hasSession } from 'utils/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!(await hasSession(req))) {
      return res.status(400).json({ message: 'API Error - No Auth' });
    }
    const id = req.query.id as string;

    if (req.method === 'GET') {
      const keyword = await getKeyword(+id);
      return res.status(200).json(keyword);
    }
    if (req.method === 'PATCH') {
      const updatedKeyword = await updateKeyword(+id, req.body);
      return res
        .status(200)
        .send({ updatedKeyword, message: 'Keyword updated' });
    }
    if (req.method === 'DELETE') {
      await removeKeywordById(+id);
      return res.status(200).send({ message: 'Keyword deleted' });
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'Unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
