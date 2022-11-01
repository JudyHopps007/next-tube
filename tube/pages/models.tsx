import { connectToDb } from '@db/database';
import { getPopularTags } from '@db/services/tags.service';
import ListSection from 'components/list/ListSection';
import { GetServerSideProps, NextPage } from 'next';
import { toJson } from 'utils/helpers';
import { toplist } from 'tube.config';
import { TagRole } from 'types/types';

type Props = {
  models: string[];
};

const HomePage: NextPage<Props> = ({ models }) => {
  return (
    <>
      <ListSection keywords={models} headline="Models" role="model" />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectToDb();
  const models = await getPopularTags(
    toplist.role as TagRole,
    toplist.listLimit,
    {
      _id: 0,
      name: 1,
    }
  );

  return {
    props: {
      models: toJson(models.map((model) => model.name)),
    },
  };
};

export default HomePage;
