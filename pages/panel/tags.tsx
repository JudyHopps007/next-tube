import PanelLayout from '@panel/layout/PanelLayout';
import PanelHeadline from '@panel/ui/Headline';
import Table from '@panel/ui/table';
import { PANEL_CONSTANTS } from 'constants/panel';
import { connectToDb } from 'database/database';
import { countTags, getTags } from 'database/services/tags.service';
import { GetServerSideProps, NextPage } from 'next';
import { Tag, TagRole } from 'types/types';
import { toJson } from 'utils/helpers';

type Props = {
  filters: {
    orderBy: string;
    search: string;
    active: string | null;
    role: TagRole | null;
  };
  tagsCount: number;
  page: number;
  tags: Tag[];
};

const PanelTagsPage: NextPage<Props> = ({ tagsCount, page, filters, tags }) => {
  return (
    <PanelLayout>
      <PanelHeadline text="Manage Tags" />
      <Table
        contentType="tag"
        titles={PANEL_CONSTANTS.TAGS_TABLE_TITLES}
        itemsCount={tagsCount}
        items={tags}
        page={page}
        itemsPerPage={PANEL_CONSTANTS.TAGS_PER_PAGE}
      />
    </PanelLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: {
    page = 1,
    search = '',
    orderBy = 'desc',
    role = null,
    active = null,
  },
}) => {
  await connectToDb();

  const tagsCount = await countTags(role as TagRole | null);
  const tags = await getTags(
    role as TagRole | null,
    page as number,
    PANEL_CONSTANTS.TAGS_PER_PAGE,
    {
      _id: 0,
      id: 1,
      role: 1,
      image: 1,
      name: 1,
      relatedTags: 1,
      videoCount: 1,
      active: 1,
    },
    orderBy === 'desc' ? { createdAt: -1 } : { createdAt: 1 },
    search as string
  );

  return {
    props: {
      tagsCount,
      page,
      filters: { orderBy, search, active, role },
      tags: toJson(tags),
    },
  };
};

export default PanelTagsPage;
