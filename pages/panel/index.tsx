import PanelHeadline from '@panel/ui/Headline';
import { connectToDb } from 'database/database';
import { countTags } from 'database/services/tags.service';
import { countVideos } from 'database/services/videos.service';
import { GetServerSideProps } from 'next';
import OverviewSection from '@panel/overview';
import AddContentSection from '@panel/content';
import { NextPageWithLayout } from 'types/types';
import { getPanelLayout } from 'utils/layout';

type Props = {
  videosCount: number;
  tagsCount: number;
  categoriesCount: number;
  actorsCount: number;
};

const PanelIndexPage: NextPageWithLayout<Props> = ({
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

PanelIndexPage.getLayout = getPanelLayout;

export default PanelIndexPage;
