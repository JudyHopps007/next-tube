export type Video = {
  vid: number;
  title: string;
  thumbnail: string;
  poster: string;
  hd: boolean;
  duration: number;
  views: number;
  likes: number;
  dislikes: number;
  tags: string[];
  categories: string[];
  actors: string[];
};

export type VideoMeta = {
  alternativeTitle: string;
  plattform: string;
  originalId: string;
  originalImage: string;
};

export type VideoWithMeta = Video & VideoMeta;

export type HeadlineVariant = 'h1' | 'h2' | 'h3';

export type TagDesign = 'category' | 'tag';

export type VideoIncreaseKey = 'likes' | 'dislikes' | 'views';

export type TagRole = 'category' | 'tag' | 'actor';

export type Category = {
  id: string;
  name: string;
  videoCount: number;
  image: string;
  role: TagRole;
};

export type Tag = {
  relatedTags: string[];
  priority: boolean;
} & Category;

export type Query = {
  [x: string]: any;
};

export type StateType = 'priority' | 'normal' | null;

export type Query = {
  [x: string]: any;
};

export type QueryProps = {
  query: Query;
};

export type PaneldModals = 'showChangeRoleModal' | 'showEditTagsModal';
