export type Video = {
  id: number;
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

export type TagRole = 'category' | 'tag' | 'actor';

export type Category = {
  id: string;
  name: string;
  videoCount: number;
  image: string;
  originalImage: string;
  role: TagRole;
};

export type Tag = {
  relatedTags: string[];
  isPriority: boolean;
  isParsed: boolean;
} & Category;

export type HeadlineVariant = 'h1' | 'h2' | 'h3';

export type TagDesign = 'category' | 'tag';

export type FeedbackSubject = 'others' | 'age' | 'broken' | 'copyrights';
