import { connectToDbHandler } from '@db/database';
import {
  getVideoById,
  removeVideoById,
  updateVideo,
} from '@db/services/videos.service';
import { NextApiRequest, NextApiResponse } from 'next';
import { hasSession } from 'utils/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!(await hasSession(req))) {
      return res.status(400).json({ message: 'API Error - No Auth' });
    }
    const id = req.query.id as string;

    if (req.method === 'GET') {
      const video = await getVideoById(+id);
      return res.status(200).json(video);
    }
    if (req.method === 'PATCH') {
      const tag = await updateVideo(+id, req.body);
      return res.status(200).send({ tag, message: 'Video updated' });
    }
    if (req.method === 'DELETE') {
      const tag = await removeVideoById(+id);
      return res.status(200).send({ message: 'Video deleted' });
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'Unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
