export type Video = {
  id: number;
  title: string;
  thumbnail: string;
  poster: string;
  isHD: boolean;
  duration: number;
  slug: string;
  views: number;
  likes: number;
  dislikes: number;
  tags: string[];
  categories: string[];
  models: string[];
  createdAt: Date;
};

export type VideoMeta = {
  alternativeTitle: string;
  plattform: string;
  originalId: string;
  originalImage: string;
};

export type VideoWithMeta = Video & VideoMeta;

export type TagRole = 'category' | 'tag' | 'model';

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

export type Routes = 'video' | TagRole | NavPages;

export type NavPages = 'top' | 'new';
