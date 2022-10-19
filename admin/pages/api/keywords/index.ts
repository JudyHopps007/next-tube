import { connectToDbHandler } from '@db/database';
import { addKeyword, keywordExists } from '@db/services/keywords.service';
import { NextApiRequest, NextApiResponse } from 'next';
import { hasSession } from 'utils/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { role, name } = req.body;
      if (role === 'title' && (await keywordExists(name, role))) {
        return res.status(200).send({ exists: true });
      }

      const keyword = await addKeyword({
        name,
        role,
      });
      return res.status(200).send(keyword);
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'Unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
