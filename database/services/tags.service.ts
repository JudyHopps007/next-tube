import Tags from 'database/models/tags.model';
import { generateTagId } from 'database/utils/helper';
import { NextApiRequest } from 'next';

export const addTag = async (req: NextApiRequest) => {
  try {
    const { tagData } = req.body;
    const tag = new Tags({
      id: generateTagId(tagData.name),
      ...tagData,
    });
    await tag.save();
    return tag;
  } catch (err: any) {
    throw err;
  }
};

export const getRandomTags = async (amount: number, select: any = {}) => {
  try {
    const tags = Tags.aggregate([
      { $match: { blocked: false } },
      { $project: { name: 1, _id: 0 } },
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
        $caseSensitive: false,
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
