import PanelHeadline from '@ui/Headline';
import Table from 'components/table';
import { PANEL_CONSTANTS } from 'constants/panel';
import { connectToDb } from '@db/database';
import { GetServerSideProps, NextPage } from 'next';
import { Keyword, KeywordRole, KeywordStateType } from 'types/types';
import { toJson } from 'utils/helpers';
import { getSession } from 'next-auth/react';
import { redirectUser } from 'utils/auth';
import { countKeywords, getKeywords } from '@db/services/keywords.service';
import KeywordsFilters from 'components/filters/KeywordsFilter';

type Props = {
  filters: {
    state: KeywordStateType;
    role: KeywordRole | null;
    search: string;
  };
  keywordsCount: number;
  page: number;
  keywords: Keyword[];
};

const PanelTagsPage: NextPage<Props> = ({
  keywordsCount,
  page,
  filters,
  keywords,
}) => {
  return (
    <>
      <PanelHeadline
        text="Manage Keywords"
        btnText="Add Keywords"
        href="/keywords/add"
        hasIcon
      />
      <KeywordsFilters
        role={filters.role}
        state={filters.state}
        search={filters.search}
      />
      <Table
        contentType="keyword"
        titles={PANEL_CONSTANTS.KEYWORDS_TABLE_TITLES}
        itemsCount={keywordsCount}
        items={keywords}
        page={page}
        itemsPerPage={PANEL_CONSTANTS.KEYWORDS_PER_PAGE}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = 1, role = null, search = '', state = null } = context.query;
  const session = await getSession(context);
  const { needRedirect, loginPath } = redirectUser(session);
  if (needRedirect) return loginPath;
  await connectToDb();

  const keywordsCount = await countKeywords(
    role as KeywordRole | null,
    state as KeywordStateType,
    search as string
  );
  const keywords = await getKeywords(
    role as KeywordRole | null,
    page as number,
    PANEL_CONSTANTS.KEYWORDS_PER_PAGE,
    {
      _id: 0,
      id: 1,
      role: 1,
      name: 1,
      isParsed: 1,
      message: 1,
      videosCount: 1,
    },
    { createdAt: -1 },
    search as string,
    state as KeywordStateType
  );

  return {
    props: {
      keywordsCount,
      page,
      filters: { search, state, role },
      keywords: toJson(keywords),
    },
  };
};

export default PanelTagsPage;
