import { connectToDbHandler } from '@db/database';
import {
  getKeyword,
  keywordExists,
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
      const { role } = req.body;
      let canBeUpdated = true;

      if (role === 'title') {
        const keyword = await getKeyword(+id);
        const exists = await keywordExists(keyword.name, role);
        canBeUpdated = !exists;
      }

      if (canBeUpdated) {
        const updatedKeyword = await updateKeyword(+id, req.body);
        return res
          .status(200)
          .send({ updatedKeyword, updated: true, message: 'Keyword updated' });
      } else {
        return res.status(200).send({
          updated: false,
          message: 'Title not unique',
        });
      }
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
