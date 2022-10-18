import { connectToDbHandler } from '@db/database';
import { getTag, removeTagById, updateTag } from '@db/services/tags.service';
import { NextApiRequest, NextApiResponse } from 'next';
import { Tag } from 'types/types';
import { hasSession } from 'utils/auth';
import { createImage, deleteImage } from 'utils/cdn';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!(await hasSession(req))) {
      return res.status(400).json({ message: 'API Error - No Auth' });
    }
    const id = req.query.id as string;

    if (req.method === 'GET') {
      const tag = await getTag(id);
      return res.status(200).json(tag);
    }
    if (req.method === 'PATCH') {
      const tag = await getTag(id);
      let updatedTag = null;
      if (
        tag.originalImage !== req.body.originalImage ||
        tag.name !== req.body.name ||
        tag.role !== req.body.role
      ) {
        deleteImage(tag.originalImage, tag.name, tag.role, '');
        const image = await createImage(
          req.body.originalImage,
          req.body.name,
          250,
          400,
          req.body.role,
          ''
        );
        updatedTag = await updateTag(id, { ...req.body, image });
      } else {
        updatedTag = await updateTag(id, req.body);
      }
      return res.status(200).send({ updatedTag, message: 'Tag updated' });
    }
    if (req.method === 'DELETE') {
      const tag = (await getTag(id)) as Tag;
      if (tag.originalImage) {
        deleteImage(tag.originalImage, tag.name, tag.role, '');
      }
      await removeTagById(id);
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
