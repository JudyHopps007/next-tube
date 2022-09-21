import BaseLayout from 'components/layout/BaseLayout';
import TagsSection from 'components/tags/TagSection';
import VideosSection from 'components/videos/VideoSection';
import type { NextPage } from 'next';

const DUMMY_DATA = [
  {
    id: 1,
    views: 1231231231,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    image:
      'https://i.ytimg.com/vi/-_xkTE8EeLA/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQy3qgnE4lujj7ZOhpdmGNGZOkJA',
  },
  {
    id: 2,
    views: 1241,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    image:
      'https://i.ytimg.com/vi/1q-hwaWm_oU/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAGRoAuHLjEp98N5dAaZ2EFWzppQw',
  },
  {
    id: 3,
    views: 123131,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    image:
      'https://i.ytimg.com/vi/xey4G0FQvbE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB_5aj8JpjYEsR0SzNY3uENBIlIiQ',
  },
  {
    id: 4,
    views: 113,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    image:
      'https://i.ytimg.com/vi/Qvi3VTLzSfM/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC_y7KgaHhL_XPv2UkR9n4sUmSbdA',
  },
  {
    id: 1,
    views: 1231231231,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    image:
      'https://i.ytimg.com/vi/-_xkTE8EeLA/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQy3qgnE4lujj7ZOhpdmGNGZOkJA',
  },
  {
    id: 2,
    views: 1241,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    image:
      'https://i.ytimg.com/vi/1q-hwaWm_oU/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAGRoAuHLjEp98N5dAaZ2EFWzppQw',
  },
  {
    id: 3,
    views: 123131,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    image:
      'https://i.ytimg.com/vi/xey4G0FQvbE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB_5aj8JpjYEsR0SzNY3uENBIlIiQ',
  },
  {
    id: 4,
    views: 113,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, provident!',
    image:
      'https://i.ytimg.com/vi/Qvi3VTLzSfM/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC_y7KgaHhL_XPv2UkR9n4sUmSbdA',
  },
];

const DUMMY_TAGS = [
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

const HomePage: NextPage = () => {
  return (
    <BaseLayout>
      <VideosSection headline="Latest Videos" videos={DUMMY_DATA} />
      <TagsSection headline="Categories" tags={DUMMY_TAGS} />
    </BaseLayout>
  );
};

export default HomePage;
