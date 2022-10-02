import PanelLayout from '@panel/layout/PanelLayout';
import PanelHeadline from '@panel/ui/Headline';
import Table from '@panel/ui/table';
import VideosFilters from '@panel/filters/VideosFilters';
import { PANEL_CONSTANTS } from 'constants/panel';
import { connectToDb } from 'database/database';
import { countVideos, getVideos } from 'database/services/videos.service';
import { GetServerSideProps, NextPage } from 'next';
import { Video } from 'types/types';
import { toJson } from 'utils/helpers';

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
    <PanelLayout>
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
    </PanelLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 1, search = '', orderBy = null },
}) => {
  await connectToDb();
  const videos = await getVideos(
    page as number,
    PANEL_CONSTANTS.VIDEOS_PER_PAGE,
    {
      _id: 0,
      vid: 1,
      title: 1,
      thumbnail: 1,
      tags: 1,
      categories: 1,
      actors: 1,
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
