import Tags from '@db/models/tags.model';
import { generateTagId } from '@db/utils/helpers';
import { TagRole } from 'types/types';

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
  select: any = {}
) => {
  try {
    const tags = Tags.find({ role: role })
      .limit(limit)
      .sort({ videoCount: -1 })
      .select(select);
    return tags;
  } catch (error) {
    throw error;
  }
};
