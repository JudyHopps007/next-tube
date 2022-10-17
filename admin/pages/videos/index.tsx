import PanelHeadline from '@ui/Headline';
import Table from 'components/table';
import VideosFilters from 'components/filters/VideosFilters';
import { PANEL_CONSTANTS } from 'constants/panel';
import { connectToDb } from '@db/database';
import { countVideos, getVideos } from '@db/services/videos.service';
import { GetServerSideProps, NextPage } from 'next';
import { toJson } from 'utils/helpers';
import { Video } from 'types/types';
import { getSession } from 'next-auth/react';
import { redirectUser } from 'utils/auth';

type Props = {
  filters: {
    orderBy: string;
    search: string;
  };
  videosCount: number;
  page: number;
  videos: Video[];
};

const PanelVideosPage: NextPage<Props> = ({
  videosCount,
  page,
  filters,
  videos,
}) => {
  return (
    <>
      <PanelHeadline text="Manage Videos" />
      <VideosFilters orderBy={filters.orderBy} search={filters.search} />
      <Table
        contentType="video"
        titles={PANEL_CONSTANTS.VIDEOS_TABLE_TITLES}
        itemsCount={videosCount}
        items={videos}
        page={page}
        itemsPerPage={PANEL_CONSTANTS.VIDEOS_PER_PAGE}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = 1, search = '', orderBy = null } = context.query;
  const session = await getSession(context);
  const { needRedirect, loginPath } = redirectUser(session);
  if (needRedirect) return loginPath;
  await connectToDb();
  const videos = await getVideos(
    page as number,
    PANEL_CONSTANTS.VIDEOS_PER_PAGE,
    {
      _id: 0,
      id: 1,
      title: 1,
      thumbnail: 1,
      tags: 1,
      categories: 1,
      actors: 1,
      alternativeTitle: 1,
      plattform: 1,
      originalId: 1,
    },
    orderBy ? { createdAt: 1 } : { createdAt: -1 },
    search as string
  );
  const videosCount = await countVideos(search as string);

  return {
    props: {
      videosCount,
      page,
      filters: { orderBy, search },
      videos: toJson(videos),
    },
  };
};

export default PanelVideosPage;
