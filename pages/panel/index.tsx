import PanelLayout from 'components/layout/PanelLayout';
import Headline from 'components/ui/Headline';
import { connectToDb } from 'database/database';
import { countTags } from 'database/services/tags.service';
import { countVideos } from 'database/services/videos.service';
import { NextPage, GetServerSideProps } from 'next';

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
    <PanelLayout>
      <h1 className="font-semibold">Stats</h1>
    </PanelLayout>
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
