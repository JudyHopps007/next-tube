import { GetServerSideProps, NextPage } from 'next';
import CategoriesSection from 'components/categories/CategoriesSection';
import TagsSection from 'components/tags/TagSection';
import VideosSection from 'components/videos/VideosSection';
import { Category, TagRole, Video } from 'types/types';
import { getPopularTags, getRandomTags } from '@db/services/tags.service';
import { connectToDb } from '@db/database';
import { toJson } from 'utils/helpers';
import { getRandomVideos } from '@db/services/videos.service';
import { categorySelector, videoSelector } from 'constants/database';
import { index } from 'tube.config';

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
  const videos = await getRandomVideos(index.randomVideosLimit, videoSelector);
  const tags = await getRandomTags(index.tagsLimit, 'tag', { _id: 0, name: 1 });
  const categories = await getPopularTags(
    index.categoriesSectionRole as TagRole,
    index.categoriesSectionLimit,
    categorySelector
  );

  return {
    props: {
      categories: toJson(categories),
      videos: toJson(videos),
      tags: toJson(tags.map((tag) => tag.name)),
    },
  };
};

export default HomePage;
