import Tags from '@db/models/tags.model';
import { generateTagId } from '@db/utils/helpers';
import { TagRole, Video } from 'types/types';

export const getRandomTags = async (
  amount: number,
  role: TagRole = 'tag',
  select: any = {}
) => {
  try {
    const tags = Tags.aggregate([
      { $match: { role: role } },
      { $project: select },
      { $sample: { size: amount } },
    ]);
    if (!tags) throw new Error(`Could not find ${amount} Tags`);
    return tags;
  } catch (error) {
    throw error;
  }
};

export const searchRelatedTags = async (
  name: string,
  limit: number,
  select: any = {}
) => {
  try {
    const tags = await Tags.find({
      id: { $ne: generateTagId(name) },
      $text: {
        $search: name,
        $caseSensitive: true,
        $diacriticSensitive: true,
      },
      score: { $meta: 'textScore' },
      role: 'tag',
    })
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .select(select);
    return tags;
  } catch (err: any) {
    throw err;
  }
};

export const getPopularTags = async (
  role: TagRole,
  limit: number,
  select: any = {},
  fillArray: boolean = true
) => {
  try {
    const tags = await Tags.find({ role: role, isPriority: true })
      .limit(limit)
      .sort({ videoCount: -1 })
      .select(select);

    let moreTags = [];
    if (fillArray && tags.length < limit) {
      moreTags = await Tags.find({ role: role, isPriority: false })
        .limit(limit)
        .sort({ videoCount: -1 })
        .select(select);
    }

    return tags.concat(moreTags);
  } catch (error) {
    throw error;
  }
};

export const getSEOTags = async (
  keyword: string,
  limit: number,
  select: any = {}
) => {
  const role = 'tag';
  // 5 Prio Tags
  const prioTags = await Tags.aggregate([
    { $match: { role: role, isPriority: true } },
    { $project: select },
    { $sample: { size: 5 } },
  ]);
  // 5 Related Tags
  let relatedTags = [];
  if (keyword.length !== 0) {
    relatedTags = await searchRelatedTags(keyword, 5, select);
  }
  // fill with random till limit reached
  const randomTagsLimit = limit - relatedTags.length - prioTags.length;
  const randomTags = await Tags.aggregate([
    { $match: { role: role, isPriority: false } },
    { $project: select },
    { $sample: { size: randomTagsLimit } },
  ]);
  let result = [] as any[];
  return result.concat(prioTags, relatedTags, randomTags);
};
