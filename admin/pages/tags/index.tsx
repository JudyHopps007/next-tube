import TagsFilters from 'components/filters/TagsFilters';
import PanelHeadline from '@ui/Headline';
import Table from 'components/table';
import { PANEL_CONSTANTS } from 'constants/panel';
import { connectToDb } from '@db/database';
import { countTags, getTags } from '@db/services/tags.service';
import { GetServerSideProps, NextPage } from 'next';
import { StateType, Tag, TagRole } from 'types/types';
import { toJson } from 'utils/helpers';
import { getSession } from 'next-auth/react';
import { redirectUser } from 'utils/auth';

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

const PanelTagsPage: NextPage<Props> = ({ tagsCount, page, filters, tags }) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = 1, search = '', role = null, state = null } = context.query;
  const session = await getSession(context);
  const { needRedirect, loginPath } = redirectUser(session);
  if (needRedirect) return loginPath;
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
      originalImage: 1,
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

export default PanelTagsPage;
