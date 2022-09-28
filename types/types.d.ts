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

export type TagDesign = 'category' | 'tags';

export type Categories = {
  id: string; // a unique string
  name: string;
  videoCount: number;
  image: string;
};

export type VideoIncreaseKeys = 'likes' | 'dislikes' | 'views';

export type Actors = Categories;
