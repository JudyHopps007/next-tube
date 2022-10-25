import PanelHeadline from '@ui/Headline';
import Table from 'components/table';
import { PANEL_CONSTANTS } from 'constants/panel';
import { connectToDb } from '@db/database';
import { GetServerSideProps, NextPage } from 'next';
import { Feedback } from 'types/types';
import { toJson } from 'utils/helpers';
import { getSession } from 'next-auth/react';
import { redirectUser } from 'utils/auth';
import { countFeedbacks, getFeedbacks } from '@db/services/feedbacks.service';

type Props = {
  feedbacksCount: number;
  page: number;
  feedbacks: Feedback[];
};

const PanelTagsPage: NextPage<Props> = ({
  feedbacksCount,
  page,
  feedbacks,
}) => {
  return (
    <>
      <PanelHeadline text="Manage Feedbacks" />
      <Table
        contentType="feedback"
        titles={PANEL_CONSTANTS.FEEDBACKS_TABLE_TITLES}
        itemsCount={feedbacksCount}
        items={feedbacks}
        page={page}
        itemsPerPage={PANEL_CONSTANTS.FEEDBACKS_PER_PAGE}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = 1 } = context.query;
  const session = await getSession(context);
  const { needRedirect, loginPath } = redirectUser(session);
  if (needRedirect) return loginPath;
  await connectToDb();

  const feedbacksCount = await countFeedbacks();

  const feedbacks = await getFeedbacks(
    page as number,
    PANEL_CONSTANTS.FEEDBACKS_PER_PAGE,
    { _id: 0, id: 1, subject: 1, message: 1, email: 1, hasSeen: 1 },
    { createdAt: -1 }
  );

  return {
    props: {
      feedbacksCount,
      page,
      feedbacks: toJson(feedbacks),
    },
  };
};

export default PanelTagsPage;
