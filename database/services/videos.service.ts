import Videos from 'database/models/videos.model';
import { NextApiRequest } from 'next';
import { VideoIncreaseKeys } from 'types/types';

export const addVideo = async (req: NextApiRequest) => {
  try {
    const { videoData } = req.body;
    const video = new Videos({
      vid: 1, // get replaced with counter value
      ...videoData,
    });
    await video.save();
    return video;
  } catch (err: any) {
    throw err;
  }
};

export const removeById = async (vid: number) => {
  try {
    const video = await Videos.findOneAndDelete({ vid });
    if (!video) throw new Error(`Video with id ${vid} not found.`);
    return true;
  } catch (error) {
    throw error;
  }
};

export const updateVideo = async (vid: number, body: any) => {
  try {
    const video = await Videos.findOneAndUpdate({ vid: vid }, { $set: body });
    if (!video) throw new Error(`Video with id ${vid} not found.`);
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

export const increaseVideo = async (vid: number, key: VideoIncreaseKeys) => {
  try {
    const video = await Videos.findOneAndUpdate(
      { vid: vid },
      { $inc: { [key]: 1 } }
    );
    if (!video) throw new Error(`Video with id ${vid} not found.`);
    return video;
  } catch (error) {
    throw error;
  }
};

export const videoExists = async (vid: number) => {
  const video = await Videos.findOne({ vid });
  if (!video) return false;
  return true;
};
