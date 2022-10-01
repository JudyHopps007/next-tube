import PanelLayout from '@panel/layout/PanelLayout';
import PanelHeadline from '@panel/ui/Headline';
import VideosManager from '@panel/videos';
import { connectToDb } from 'database/database';
import { countVideos } from 'database/services/videos.service';
import { GetServerSideProps, NextPage } from 'next';

type Props = {
  filters: {
    orderBy: string;
    search: string;
  };
  videosCount: number;
  page: number;
};

const PanelVideosPage: NextPage<Props> = ({ videosCount, page, filters }) => {
  return (
    <PanelLayout>
      <PanelHeadline text="Manage Videos" />
      <VideosManager filters={filters} videosCount={videosCount} page={page} />
    </PanelLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 1, search = '', orderBy = 'desc' },
}) => {
  await connectToDb();
  const videosCount = await countVideos();
  return {
    props: {
      videosCount,
      page,
      filters: { orderBy, search },
    },
  };
};

export default PanelVideosPage;
