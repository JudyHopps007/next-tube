import CategoriesSection from 'components/categories/CategoriesSection';
import BaseLayout from 'components/layout/BaseLayout';
import ListSection from 'components/list/ListSection';
import Pagination from 'components/pagination';
import TagsSection from 'components/tags/TagSection';
import VideosSection from 'components/videos/VideoSection';
import type { NextPage } from 'next';
import { Tag, Video } from 'types/types';

const DUMMY_DATA = [
  {
    vid: 1,
    views: 1231231231,
    title: 'Lorem lol',
    tags: ['lol'],
    thumbnail:
      'https://i.ytimg.com/vi/-_xkTE8EeLA/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQy3qgnE4lujj7ZOhpdmGNGZOkJA',
  },
  {
    vid: 2,
    views: 1241,
    tags: ['lol'],
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    thumbnail:
      'https://i.ytimg.com/vi/1q-hwaWm_oU/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAGRoAuHLjEp98N5dAaZ2EFWzppQw',
  },
  {
    vid: 3,
    views: 123131,
    tags: ['lol'],
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    thumbnail:
      'https://i.ytimg.com/vi/xey4G0FQvbE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB_5aj8JpjYEsR0SzNY3uENBIlIiQ',
  },
  {
    vid: 4,
    views: 113,
    tags: ['lol', 'wtf'],
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    thumbnail:
      'https://i.ytimg.com/vi/Qvi3VTLzSfM/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC_y7KgaHhL_XPv2UkR9n4sUmSbdA',
  },
  {
    vid: 5,
    views: 1231231231,
    tags: [],
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    thumbnail:
      'https://i.ytimg.com/vi/-_xkTE8EeLA/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQy3qgnE4lujj7ZOhpdmGNGZOkJA',
  },
  {
    vid: 6,
    views: 1241,
    tags: ['lol'],
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    thumbnail:
      'https://i.ytimg.com/vi/1q-hwaWm_oU/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAGRoAuHLjEp98N5dAaZ2EFWzppQw',
  },
  {
    vid: 10,
    views: 123131,
    tags: ['lol'],
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    thumbnail:
      'https://i.ytimg.com/vi/xey4G0FQvbE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB_5aj8JpjYEsR0SzNY3uENBIlIiQ',
  },
  {
    vid: 9,
    views: 113,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    tags: ['lol'],
    thumbnail:
      'https://i.ytimg.com/vi/Qvi3VTLzSfM/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC_y7KgaHhL_XPv2UkR9n4sUmSbdA',
  },
];

const DUMMY_TAGS = [
  'hans penter',
  'ada',
  'eth what',
  'lol dasd ',
  'lol2 dasd',
  'lol3 das d',
  'lol das',
  'lol2 dasdas',
  'lol3dasdas',
  'lol fasdf sddas',
  'lol2asda ',
  'lol3dasd asda sdasddas',
];

const DUMMY_CATEGORIES = [
  {
    id: 'test',
    name: 'test',
    image: '/images/placeholder-category.png',
    videoCount: 1337,
  },
  {
    id: 'john wayne',
    name: 'John Wayne',
    image: '/images/placeholder-category.png',
    videoCount: 1337,
  },
  {
    id: 'lulzi lulz',
    name: 'Lulzi &   lulz $',
    image: '/images/placeholder-category.png',
    videoCount: 88,
  },
  {
    id: 'jaja lulz',
    name: 'JaJA lulz',
    image: '/images/placeholder-category.png',
    videoCount: 88,
  },
];

const HomePage: NextPage = () => {
  return (
    <BaseLayout>
      <CategoriesSection
        headline="Categories"
        role="category"
        categories={DUMMY_CATEGORIES as Tag[]}
      />
      <VideosSection headline="Latest Videos" videos={DUMMY_DATA as Video[]} />
      <TagsSection headline="Tags" tags={DUMMY_TAGS} />
      <ListSection headline="List" keywords={DUMMY_TAGS} />
      <Pagination path="tag" name="lol" currentPage={2} />
    </BaseLayout>
  );
};

export default HomePage;
