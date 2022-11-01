import { NavPages, TagRole } from 'types/types';
import { getRoute, slugify, slugifyAndPage } from './helpers';

export const buildTagUrl = (name: string, route: TagRole = 'tag', page = 1) => {
  const url = '/' + `${getRoute(route)}/` + slugifyAndPage(name, page);
  return url;
};

export const buildVideoUrl = (id: number, name: string) => {
  return '/' + `${getRoute('video')}/${id}/${slugify(name)}`;
};

export const buildNavUrl = (route: NavPages, page = 1) => {
  let url = '/' + `${getRoute(route)}`;
  if (page > 1) {
    url += `-${page}`;
  }
  return url;
};
