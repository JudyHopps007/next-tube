import { connectToDbHandler } from 'database/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getRelatedImage } from 'utils/parser';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const { keyword } = req.query;
      const image = await getRelatedImage(keyword as string);
      return res.status(200).json({ image });
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'Unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
