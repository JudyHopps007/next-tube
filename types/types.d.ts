export type Video = {
  id: number;
  title: string;
  image: string;
  views: number;
  tags: string[];
};

export type HeadlineVariant = 'h1' | 'h2' | 'h3';

export type TagDesign = 'category' | 'tags';
