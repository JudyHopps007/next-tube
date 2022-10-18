import { connectToDbHandler } from '@db/database';
import {
  getVideoById,
  removeVideoById,
  updateVideo,
} from '@db/services/videos.service';
import { IMAGE_SETTINGS } from 'constants/image';
import { NextApiRequest, NextApiResponse } from 'next';
import { VideoWithMeta } from 'types/types';
import { hasSession } from 'utils/auth';
import { createImage, deleteImage } from 'utils/cdn';

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
      const video = (await getVideoById(+id)) as VideoWithMeta;

      let updatedVideo = null;

      if (
        video.title !== req.body.title ||
        video.originalImage !== req.body.originalImage
      ) {
        deleteImage(
          video.originalImage,
          video.title,
          IMAGE_SETTINGS.thumbnail.subPath,
          IMAGE_SETTINGS.thumbnail.prefix
        );
        deleteImage(
          video.originalImage,
          video.title,
          IMAGE_SETTINGS.poster.subPath,
          IMAGE_SETTINGS.poster.prefix
        );
        const thumbnail = await createImage(
          req.body.originalImage,
          req.body.title,
          IMAGE_SETTINGS.thumbnail.height,
          IMAGE_SETTINGS.thumbnail.width,
          IMAGE_SETTINGS.thumbnail.subPath,
          IMAGE_SETTINGS.thumbnail.prefix
        );
        const poster = await createImage(
          req.body.originalImage,
          req.body.title,
          IMAGE_SETTINGS.poster.height,
          IMAGE_SETTINGS.poster.width,
          IMAGE_SETTINGS.poster.subPath,
          IMAGE_SETTINGS.poster.prefix
        );
        updatedVideo = await updateVideo(+id, {
          ...req.body,
          thumbnail: thumbnail,
          poster: poster,
        });
      } else {
        updatedVideo = await updateVideo(+id, req.body);
      }
      return res.status(200).send({ updatedVideo, message: 'Video updated' });
    }
    if (req.method === 'DELETE') {
      const video = (await getVideoById(+id)) as VideoWithMeta;
      deleteImage(
        video.originalImage,
        video.title,
        IMAGE_SETTINGS.thumbnail.subPath,
        IMAGE_SETTINGS.thumbnail.prefix
      );
      deleteImage(
        video.originalImage,
        video.title,
        IMAGE_SETTINGS.poster.subPath,
        IMAGE_SETTINGS.poster.prefix
      );
      await removeVideoById(+id);
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
