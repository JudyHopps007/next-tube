import { connectToDbHandler } from '@db/database';
import { addKeyword, keywordExists } from '@db/services/keywords.service';
import { NextApiRequest, NextApiResponse } from 'next';
import { hasSession } from 'utils/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!(await hasSession(req))) {
      return res.status(400).json({ message: 'API Error - No Auth' });
    }
    if (req.method === 'POST') {
      const { role, keywords } = req.body;
      const totalKeywords = keywords.length;
      let addedKeywords = 0;
      for (let keyword of keywords) {
        if (role === 'title' && (await keywordExists(keyword, role))) {
          break;
        }
        const newKeyword = await addKeyword({
          name: keyword,
          role,
        });
        addedKeywords++;
      }

      return res
        .status(200)
        .send({
          errors: totalKeywords - addedKeywords,
          success: addedKeywords,
        });
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'Unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
