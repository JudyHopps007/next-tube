import { GetServerSideProps, NextPage } from 'next';
import CategoriesSection from 'components/categories/CategoriesSection';
import TagsSection from 'components/tags/TagSection';
import VideosSection from 'components/videos/VideosSection';
import { Category, Video } from 'types/types';
import { getPopularTags, getRandomTags } from '@db/services/tags.service';
import { connectToDb } from '@db/database';
import { toJson } from 'utils/helpers';
import { getVideos } from '@db/services/videos.service';

type Props = {
  categories: Category[];
  videos: Video[];
  tags: string[];
};

const HomePage: NextPage<Props> = ({ categories, videos, tags }) => {
  return (
    <>
      <CategoriesSection headline="Categories" categories={categories} />
      <VideosSection headline="Latest Videos" videos={videos} />
      <TagsSection headline="Popular Searches" tags={tags} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectToDb();
  const videos = await getVideos(1, 40, {
    _id: 0,
    id: 1,
    title: 1,
    tags: 1,
    models: 1,
    categories: 1,
    views: 1,
    duration: 1,
    isHD: 1,
  });
  const tags = await getRandomTags(15, 'tag', { _id: 0, name: 1 });
  const categories = await getPopularTags('category', 20, {
    _id: 0,
    id: 1,
    name: 1,
    role: 1,
    image: 1,
    videoCount: 1,
  });

  return {
    props: {
      categories: toJson(categories),
      videos: toJson(videos),
      tags: toJson(tags.map((tag) => tag.name)),
    },
  };
};

export default HomePage;
