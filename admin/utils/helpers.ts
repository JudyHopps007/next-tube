import { Query } from 'types/types';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const isEmpty = (val: any) => {
  return val === undefined || val == null || val.length <= 0 ? true : false;
};

export const slugify = (str: string) => {
  const badChars = '#!?;./`´§%&)(/$,:+';
  for (let c of badChars) {
    str = str.replaceAll(c, '');
  }
  str = str.trim().toLowerCase().replaceAll(' ', '-').replace(/-+/g, '-');
  return str;
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
