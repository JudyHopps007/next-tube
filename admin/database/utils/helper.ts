export const generateTagId = (str: string) => {
  return str.toLocaleLowerCase().trim();
};

export const categorySelector = {
  name: 1,
  id: 1,
  image: 1,
  role: 1,
  videoCount: 1,
  _id: 0,
};

export const tagSelector = { name: 1, _id: 0 };

export const sortLatest = { createdAt: -1 };

export const sortOldest = { createdAt: -1 };
