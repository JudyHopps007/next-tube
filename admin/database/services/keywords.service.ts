import Keywords from '@db/models/keywords.model';
import { KeywordRole } from 'types/types';

export const addKeyword = async (data: any) => {
  try {
    const keyword = new Keywords({
      ...data,
      id: 1,
    });
    await keyword.save();
    return keyword;
  } catch (err: any) {
    throw err;
  }
};

export const keywordExists = async (name: string, role: KeywordRole) => {
  const keyword = await Keywords.findOne({ name: name, role: role });
  if (!keyword) return false;
  return true;
};

export const updateKeyword = async (id: number, body: any) => {
  try {
    const keyword = await Keywords.findOneAndUpdate({ id: id }, { $set: body });
    if (!keyword) throw new Error(`Keyword with id ${id} not found.`);
    return keyword;
  } catch (error) {
    throw error;
  }
};

export const getKeyword = async (id: number) => {
  try {
    const keyword = await Keywords.findOne({ id: id });
    if (!keyword) throw new Error(`Keyword with id ${id} not found.`);
    return keyword;
  } catch (error) {
    throw error;
  }
};

export const getTags = async (
  role: KeywordRole | null,
  page: number,
  limit: number,
  select: any = {},
  sort: any = { createdAt: -1 },
  state: 'parsed' | 'unparsed' | null = null
) => {
  try {
    const filterRole = role ? { role: role } : null;
    const filterState = state
      ? { isParsed: state === 'parsed' ? true : false }
      : null;
    const skip = page * limit - limit;
    const keywords = Keywords.find({ ...filterRole, ...filterState })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(select);
    return keywords;
  } catch (error) {
    throw error;
  }
};
