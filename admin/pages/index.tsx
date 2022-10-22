import PanelHeadline from '@ui/Headline';
import { connectToDb } from 'database/database';
import { countTags } from '@db/services/tags.service';
import { countVideos } from '@db/services/videos.service';
import { GetServerSideProps, NextPage } from 'next';
import OverviewSection from 'components/overview';
import AddContentSection from 'components/content/AddContentSection';
import { getSession } from 'next-auth/react';
import { redirectUser } from 'utils/auth';
import { countKeywords } from '@db/services/keywords.service';

type Props = {
  videosCount: number;
  tagsCount: number;
  categoriesCount: number;
  actorsCount: number;
  keywordsCount: number;
};

const PanelIndexPage: NextPage<Props> = ({
  videosCount,
  tagsCount,
  categoriesCount,
  actorsCount,
  keywordsCount,
}) => {
  return (
    <>
      <PanelHeadline text="Statistics" />
      <OverviewSection
        counts={{
          videosCount,
          tagsCount,
          categoriesCount,
          actorsCount,
          keywordsCount,
        }}
      />
      <PanelHeadline text="Add New Content" />
      <AddContentSection />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { needRedirect, loginPath } = redirectUser(session);
  if (needRedirect) return loginPath;
  await connectToDb();
  const videosCount = await countVideos();
  const tagsCount = await countTags('tag');
  const categoriesCount = await countTags('category');
  const actorsCount = await countTags('actor');
  const keywordsCount = await countKeywords();
  return {
    props: {
      videosCount,
      tagsCount,
      categoriesCount,
      actorsCount,
      keywordsCount,
    },
  };
};

export default PanelIndexPage;
