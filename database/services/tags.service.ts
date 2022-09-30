import Tags from 'database/models/tags.model';
import { generateTagId } from 'database/utils/helper';
import { NextApiRequest } from 'next';
import { TagRole } from 'types/types';

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

export const getRandomTags = async (
  amount: number,
  role: TagRole = 'tag',
  select: any = {}
) => {
  try {
    const tags = Tags.aggregate([
      { $match: { blocked: false, role: role } },
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
        $caseSensitive: false,
        $diacriticSensitive: true,
      },
      score: { $meta: 'textScore' },
      role: 'tag',
      blocked: false,
    })
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .select(select);
    return tags;
  } catch (err: any) {
    throw err;
  }
};

export const updateTag = async (name: string, body: any) => {
  try {
    const id = generateTagId(name);
    const tag = await Tags.findOneAndUpdate({ id: id }, { $set: body });
    if (!tag) throw new Error(`Tag with id ${id} not found.`);
    return tag;
  } catch (error) {
    throw error;
  }
};

export const updateTagCount = async (name: string, amount: number) => {
  try {
    const id = generateTagId(name);
    const tag = await Tags.findOneAndUpdate(
      { id: id },
      { $inc: { videoCount: amount } }
    );
    if (!tag) throw new Error(`Tag with id ${id} not found.`);
    return tag;
  } catch (error) {
    throw error;
  }
};

export const changeTagRole = async (name: string, newRole: TagRole) => {
  try {
    const id = generateTagId(name);
    const tag = await Tags.findOneAndUpdate(
      { id: id },
      { $set: { role: newRole } }
    );
    if (!tag) throw new Error(`Tag with id ${id} not found.`);
    return tag;
  } catch (error) {
    throw error;
  }
};

export const countTags = async (role: TagRole = 'tag') => {
  const count = await Tags.countDocuments({ role: role, blocked: false });
  return count;
};

export const getPopularTags = async (
  role: TagRole,
  limit: number,
  select: any = {}
) => {
  try {
    const tags = Tags.find({ role: role, blocked: false })
      .limit(limit)
      .sort({ videoCount: -1 })
      .select(select);
    return tags;
  } catch (error) {
    throw error;
  }
};

export const getTags = async (
  role: TagRole,
  page: number,
  limit: number,
  select: any = {},
  sort: any = { createdAt: -1 }
) => {
  try {
    const skip = page * limit - limit;
    const tags = Tags.find({ role: role, blocked: false })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(select);
    return tags;
  } catch (error) {
    throw error;
  }
};
