import { IMAGE_SETTINGS } from 'constants/image';
import Tags from 'database/models/tags.model';
import { generateTagId } from 'database/utils/helper';
import { TagStateType, TagRole } from 'types/types';
import { createImage } from 'utils/cdn';

export const addTag = async (data: any) => {
  let image = '';
  if (data?.originalImage) {
    const role = data.role as 'tag';
    image = (await createImage(
      data.originalImage,
      data.name,
      IMAGE_SETTINGS[role].height,
      IMAGE_SETTINGS[role].width,
      IMAGE_SETTINGS[role].subPath,
      IMAGE_SETTINGS[role].prefix
    )) as string;
  }

  try {
    const tag = new Tags({
      ...data,
      id: generateTagId(data.name),
      image: image,
    });
    await tag.save();
    return tag;
  } catch (err: any) {
    throw err;
  }
};

export const tagExists = async (id: string) => {
  const tag = await Tags.findOne({ id: id });
  if (!tag) return false;
  return true;
};

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

export const getTag = async (id: string) => {
  try {
    const tag = await Tags.findOne({ id: id });
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

export const countTags = async (
  role: TagRole | null = null,
  state: TagStateType = null,
  search: string = ''
) => {
  const filterRole = role ? { role: role } : null;
  const filterState = state
    ? { isPriority: state === 'priority' ? true : false }
    : null;
  const fitlerSearch =
    search.length > 0
      ? { name: { $regex: `\\b${search}\\b`, $options: 'i' } }
      : null;
  const count = await Tags.countDocuments({
    ...filterRole,
    ...filterState,
    ...fitlerSearch,
  });
  return count;
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

export const getTags = async (
  role: TagRole | null,
  page: number,
  limit: number,
  select: any = {},
  sort: any = { createdAt: -1 },
  search: string = '',
  state: TagStateType = null
) => {
  try {
    const filterRole = role ? { role: role } : null;
    const fitlerSearch =
      search.length > 0
        ? { name: { $regex: `\\b${search}\\b`, $options: 'i' } }
        : null;
    const filterState = state
      ? { isPriority: state === 'priority' ? true : false }
      : null;
    const skip = page * limit - limit;
    const tags = Tags.find({ ...filterRole, ...fitlerSearch, ...filterState })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(select);
    return tags;
  } catch (error) {
    throw error;
  }
};

export const removeTagById = async (id: string) => {
  try {
    const tag = await Tags.findOneAndDelete({ id: id });
    if (!tag) throw new Error(`Tag with id ${id} not found.`);
    return true;
  } catch (error) {
    throw error;
  }
};
