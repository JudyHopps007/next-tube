import { GetServerSideProps, NextPage } from 'next';
import CategoriesSection from 'components/categories/CategoriesSection';
import TagsSection from 'components/tags/TagSection';
import VideosSection from 'components/videos/VideosSection';
import { Category, TagRole, Video } from 'types/types';
import { getPopularTags, getSEOTags } from '@db/services/tags.service';
import { connectToDb } from '@db/database';
import { toJson } from 'utils/helpers';
import { getRandomVideos } from '@db/services/videos.service';
import { categorySelector, videoPreviewSelector } from '@db/selectors';
import { index } from 'tube.config';

type Props = {
  categories: Category[];
  videos: Video[];
  tags: string[];
};

const HomePage: NextPage<Props> = ({ categories, videos, tags }) => {
  return (
    <>
      <CategoriesSection
        headline="Categories"
        variant="h2"
        categories={categories}
      />
      <VideosSection headline="Latest Videos" variant="h2" videos={videos} />
      <TagsSection headline="Popular Searches" variant="h2" tags={tags} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectToDb();
  const videos = await getRandomVideos(index.videosLimit, videoPreviewSelector);
  const tags = await getSEOTags('', index.tagsLimit, { _id: 0, name: 1 });
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
