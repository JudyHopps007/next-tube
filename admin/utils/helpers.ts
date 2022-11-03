import { Query } from 'types/types';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const isEmpty = (val: any) => {
  return val === undefined || val == null || val.length <= 0 ? true : false;
};

export const slugify = (str: string) => {
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '-') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '');
};

export const toJson = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};

export const removeEmptyParams = (obj: Query): Query => {
  return (
    Object.fromEntries(
      Object.entries(obj).filter(
        ([_, item]: any) => item != null && item.toString().trim() !== ''
      )
    ) ?? {}
  );
};

export const randomImageId = (image: string) => {
  try {
    const lastDot = image.lastIndexOf('.');
    const imageType = image.substring(lastDot);
    const beforeNumber = image.lastIndexOf('.', lastDot - 1);
    const imagePath = image.substring(0, beforeNumber + 1);
    const newImageIndex = Math.floor(Math.random() * 10) + 5;
    return (
      imagePath
        .replace('169poster', '169lll')
        .replace('xnxxposter', 'xnxxlll') +
      newImageIndex +
      imageType
    );
  } catch (err: any) {
    return image;
  }
};

export const textAreaToArray = (tags: string) => {
  const tagArray = tags.split(/\n/);
  let result = [] as string[];
  for (let tag of tagArray) {
    if (tag.trim().length > 1) {
      result.push(tag);
    }
  }
  return result;
};

export const slugifyTitle = (title: string) => {
  const newTitle = slugify(title);
  // smaller slug size?
  return newTitle;
};

export const removeUrlFromTitle = (title: string) => {
  return title.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
};
