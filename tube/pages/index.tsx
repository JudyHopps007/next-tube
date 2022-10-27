import { GetServerSideProps, NextPage } from 'next';
import CategoriesSection from 'components/categories/CategoriesSection';
import TagsSection from 'components/tags/TagSection';
import VideosSection from 'components/videos/VideoSection';
import { Category, Video } from 'types/types';
import { getPopularTags, getRandomTags } from '@db/services/tags.service';
import { connectToDb } from '@db/database';
import { toJson } from 'utils/helpers';

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
  const videos = [] as Video[];
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
      videos,
      tags: toJson(tags.map((tag) => tag.name)),
    },
  };
};

export default HomePage;
