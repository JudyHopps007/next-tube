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
