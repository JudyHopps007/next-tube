import { connectToDbHandler } from '@db/database';
import { addVideo } from '@db/services/videos.service';
import { NextApiRequest, NextApiResponse } from 'next';
import { hasSession } from 'utils/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    /*if (!(await hasSession(req))) {
      return res.status(400).json({ message: 'API Error - No Auth' });
    }*/
    if (req.method === 'POST') {
      const video = await addVideo(req);
      return res.status(200).send(video);
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'Unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
