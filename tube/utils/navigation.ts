import { NavPages, TagRole } from 'types/types';
import { getRoute, slugify, slugifyAndPage } from './helpers';

export const buildTagUrl = (name: string, route: TagRole = 'tag', page = 1) => {
  const url = '/' + `${getRoute(route)}/` + slugifyAndPage(name, page);
  return url;
};

export const buildVideoUrl = (slug: string) => {
  return '/' + `${getRoute('video')}/${slug}`;
};

export const buildNavUrl = (route: NavPages, page = 1) => {
  let url = '/' + `${getRoute(route)}`;
  if (page > 1) {
    url += `-${page}`;
  }
  return url;
};
