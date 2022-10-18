import { IMAGE_SETTINGS } from 'constants/image';
import Videos from 'database/models/videos.model';
import { NextApiRequest } from 'next';
import { VideoIncreaseKey } from 'types/types';
import { createImage } from 'utils/cdn';

export const addVideo = async (req: NextApiRequest) => {
  try {
    const { videoData } = req.body;
    const thumbnail = await createImage(
      videoData.originalImage,
      videoData.title,
      IMAGE_SETTINGS.thumbnail.height,
      IMAGE_SETTINGS.thumbnail.width,
      IMAGE_SETTINGS.thumbnail.subPath,
      IMAGE_SETTINGS.thumbnail.prefix
    );
    const poster = await createImage(
      videoData.originalImage,
      videoData.title,
      IMAGE_SETTINGS.poster.height,
      IMAGE_SETTINGS.poster.width,
      IMAGE_SETTINGS.poster.subPath,
      IMAGE_SETTINGS.poster.prefix
    );

    const video = new Videos({
      ...videoData,
      id: 1, // get replaced with counter value
      poster,
      thumbnail,
    });
    await video.save();
    return video;
  } catch (err: any) {
    throw err;
  }
};

export const removeVideoById = async (id: number) => {
  try {
    const video = await Videos.findOneAndDelete({ id });
    if (!video) throw new Error(`Video with id ${id} not found.`);
    return true;
  } catch (error) {
    throw error;
  }
};

export const updateVideo = async (id: number, body: any) => {
  try {
    const video = await Videos.findOneAndUpdate({ id: id }, { $set: body });
    if (!video) throw new Error(`Video with id ${id} not found.`);
    return video;
  } catch (error) {
    throw error;
  }
};

export const getRandomVideos = async (amount: number) => {
  try {
    const videos = Videos.aggregate([{ $sample: { size: amount } }]);
    if (!videos) throw new Error(`Could not find ${amount} Videos`);
    return videos;
  } catch (error) {
    throw error;
  }
};

export const increaseVideo = async (id: number, key: VideoIncreaseKey) => {
  try {
    const video = await Videos.findOneAndUpdate(
      { id: id },
      { $inc: { [key]: 1 } }
    );
    if (!video) throw new Error(`Video with id ${id} not found.`);
    return video;
  } catch (error) {
    throw error;
  }
};

export const countVideos = async (search: string = '') => {
  const count = await Videos.countDocuments(
    search.length > 0
      ? { title: { $regex: `\\b${search}\\b`, $options: 'i' } }
      : {}
  );
  return count;
};

export const videoExists = async (id: number) => {
  const video = await Videos.findOne({ id });
  if (!video) return false;
  return true;
};

export const getVideoById = async (id: number) => {
  try {
    const video = await Videos.findOne({ id: id });
    if (!video) throw new Error(`Video with id ${id} not found.`);
    return video;
  } catch (error) {
    throw error;
  }
};

export const getVideos = async (
  page: number,
  limit: number,
  select: any = {},
  sort: any = { createdAt: -1 },
  search: string = ''
) => {
  try {
    const skip = page * limit - limit;
    const videos = Videos.find(
      search.length > 0
        ? { title: { $regex: `\\b${search}\\b`, $options: 'i' } }
        : {}
    )
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(select);
    return videos;
  } catch (error) {
    throw error;
  }
};
