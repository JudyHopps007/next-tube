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
import { countFeedbacks } from '@db/services/feedbacks.service';

type Props = {
  counts: {
    videosCount: number;
    tagsCount: number;
    categoriesCount: number;
    modelsCount: number;
    keywordsCount: number;
    feedbacksCount: number;
  };
};

const PanelIndexPage: NextPage<Props> = ({ counts }) => {
  return (
    <>
      <PanelHeadline text="Statistics" />
      <OverviewSection counts={counts} />
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
  const modelsCount = await countTags('model');
  const keywordsCount = await countKeywords();
  const feedbacksCount = await countFeedbacks();
  return {
    props: {
      counts: {
        feedbacksCount,
        videosCount,
        tagsCount,
        categoriesCount,
        modelsCount,
        keywordsCount,
      },
    },
  };
};

export default PanelIndexPage;
