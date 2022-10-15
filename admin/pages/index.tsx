import PanelHeadline from '@ui/Headline';
import { connectToDb } from 'database/database';
import { countTags } from '@db/services/tags.service';
import { countVideos } from '@db/services/videos.service';
import { GetServerSideProps, NextPage } from 'next';
import OverviewSection from 'components/overview';
import AddContentSection from 'components/content';

type Props = {
  videosCount: number;
  tagsCount: number;
  categoriesCount: number;
  actorsCount: number;
};

const PanelIndexPage: NextPage<Props> = ({
  videosCount,
  tagsCount,
  categoriesCount,
  actorsCount,
}) => {
  return (
    <>
      <PanelHeadline text="Statistics" />
      <OverviewSection
        counts={{ videosCount, tagsCount, categoriesCount, actorsCount }}
      />
      <PanelHeadline text="Add New Content" />
      <AddContentSection />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectToDb();
  const videosCount = await countVideos();
  const tagsCount = await countTags('tag');
  const categoriesCount = await countTags('category');
  const actorsCount = await countTags('actor');
  return {
    props: {
      videosCount,
      tagsCount,
      categoriesCount,
      actorsCount,
    },
  };
};

export default PanelIndexPage;
