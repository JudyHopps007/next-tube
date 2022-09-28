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

export type HeadlineVariant = 'h1' | 'h2' | 'h3';

export type TagDesign = 'category' | 'tag';

export type VideoIncreaseKey = 'likes' | 'dislikes' | 'views';

export type TagRole = 'category' | 'tag' | 'actor';

export type Tag = {
  id: string; // a unique string
  name: string;
  videoCount: number;
  image: string;
  role: TagRole;
  relatedTags: string[];
};
