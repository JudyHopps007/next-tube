import { routes } from 'tube.config';
import { Routes } from 'types/types';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

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

export const slugifyAndPage = (str: string, page: number = 1) => {
  return addPage(slugify(str), page);
};

export const addPage = (str: string, page: number = 1) => {
  return str.concat(`-${page}`);
};

export const getPage = (str: string) => {
  try {
    const pos = str.lastIndexOf('-');
    if (pos === -1) return null;
    const keyword = str.substring(0, pos);
    const page = str.substring(pos + 1);
    if (isNaN(parseFloat(page)) || isNaN(+page)) return null;
    return { keyword: keyword.replaceAll('-', ' '), page: parseFloat(page) };
  } catch (err: any) {
    console.log(err);
    return null;
  }
};

export const toJson = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};

export const getRoute = (routeName: Routes) => {
  return routes[routeName] as string;
};

export const getVideoId = (id: string) => {
  try {
    if (isNaN(parseFloat(id)) || isNaN(+id)) return null;
    return parseFloat(id);
  } catch (err: any) {
    return null;
  }
};

export const validateTagRole = (str: string) => {
  if (
    getRoute('tag') === str ||
    getRoute('category') === str ||
    getRoute('model') === str
  ) {
    return true;
  }
  return false;
};

export const validateNavPages = (str: string) => {
  if (getRoute('top') === str || getRoute('new') === str) {
    return true;
  }
  return false;
};

export const getTagRoleByRoute = (str: string) => {
  const res = (Object.keys(routes) as (keyof typeof routes)[]).find((key) => {
    return routes[key] === str;
  });
  return res;
};

export const removePageFromPath = (path: string) => {
  const pos = path.lastIndexOf('-');
  if (pos === -1) return path;
  return path.substring(0, pos);
};
