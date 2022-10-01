import { slugify } from './helpers';

export const buildTagUrl = (name: string, path = '', page = 1) => {
  const url =
    '/' +
    (path.length > 1 ? `${path}/` : '') +
    slugify(name) +
    (page > 1 ? `/${page}` : '');
  return url;
};

export const buildVideoUrl = (id: number, name: string, path = 'video') => {
  return '/' + `${path}/${id}/${slugify(name)}`;
};

export const calculateMinItemPerPage = (
  page: number,
  itemPerPage: number,
  totalItems: number
) => {
  if (totalItems === 0) return totalItems;
  return page === 1 ? page : (page - 1) * itemPerPage + 1;
};

export const calculateMaxItemPerPage = (
  page: number,
  itemPerPage: number,
  totalItems: number
) => {
  if (page === 1) {
    const items = page * itemPerPage;
    if (items > totalItems) return totalItems;
    return items;
  } else {
    const items = page * itemPerPage;
    if (items > totalItems) return totalItems;
    return items;
  }
};
