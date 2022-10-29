import Videos from '@db/models/videos.model';

export const getRandomVideos = async (amount: number) => {
  try {
    const videos = Videos.aggregate([{ $sample: { size: amount } }]);
    if (!videos) throw new Error(`Could not find ${amount} Videos`);
    return videos;
  } catch (error) {
    throw error;
  }
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

export const searchRelatedVideos = async (
  id: number,
  keyword: string,
  limit: number,
  select: any = {}
) => {
  try {
    const videos = await Videos.find({
      id: { $ne: id },
      $text: {
        $search: keyword,
        $caseSensitive: true,
        $diacriticSensitive: true,
      },
      score: { $meta: 'textScore' },
    })
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .select(select);
    return videos;
  } catch (err: any) {
    return [];
  }
};

export const searchVideos = async (
  keyword: string,
  limit: number,
  select: any = {}
) => {
  try {
    const videos = await Videos.find({
      $text: {
        $search: keyword,
        $caseSensitive: true,
        $diacriticSensitive: true,
      },
      score: { $meta: 'textScore' },
    })
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .select(select);
    return videos;
  } catch (err: any) {
    return [];
  }
};
