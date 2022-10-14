import TagsFilters from '@panel/filters/TagsFilters';
import PanelHeadline from '@panel/ui/Headline';
import Table from '@panel/ui/table';
import { PANEL_CONSTANTS } from 'constants/panel';
import { connectToDb } from 'database/database';
import { countTags, getTags } from 'database/services/tags.service';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout, StateType, Tag, TagRole } from 'types/types';
import { toJson } from 'utils/helpers';
import { getPanelLayout } from 'utils/layout';

type Props = {
  filters: {
    search: string;
    state: StateType;
    role: TagRole | null;
  };
  tagsCount: number;
  page: number;
  tags: Tag[];
};

const PanelTagsPage: NextPageWithLayout<Props> = ({
  tagsCount,
  page,
  filters,
  tags,
}) => {
  return (
    <>
      <PanelHeadline text="Manage Tags" />
      <TagsFilters
        role={filters.role}
        state={filters.state}
        search={filters.search}
      />
      <Table
        contentType="tag"
        titles={PANEL_CONSTANTS.TAGS_TABLE_TITLES}
        itemsCount={tagsCount}
        items={tags}
        page={page}
        itemsPerPage={PANEL_CONSTANTS.TAGS_PER_PAGE}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 1, search = '', role = null, state = null },
}) => {
  await connectToDb();

  const tagsCount = await countTags(
    role as TagRole | null,
    state as StateType,
    search as string
  );
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
      isPriority: 1,
      isParsed: 1,
    },
    { createdAt: -1 },
    search as string,
    state as StateType
  );

  return {
    props: {
      tagsCount,
      page,
      filters: { search, state, role },
      tags: toJson(tags),
    },
  };
};

PanelTagsPage.getLayout = getPanelLayout;

export default PanelTagsPage;
