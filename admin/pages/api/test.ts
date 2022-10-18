import { connectToDbHandler } from '@db/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { createImage, deleteImage } from 'utils/cdn';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const img =
        'https://img-cf.xvideos-cdn.com/videos/thumbs169lll/03/8a/54/038a549a4aa1c8d370be6d4216197704/038a549a4aa1c8d370be6d4216197704.10.jpg';
      await createImage(img, 'rofl dofle', 250, 400, '', '_thumb');
      await createImage(img, 'rofl dofle', 350, 500, '', '_poster');
      deleteImage(img, 'rofl dofle', '', '_thumb');
      deleteImage(img, 'rofl dofle', '', '_poster');

      await createImage(img, 'best category', 250, 400, 'category', '');

      return res.status(200).send({});
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'Unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
