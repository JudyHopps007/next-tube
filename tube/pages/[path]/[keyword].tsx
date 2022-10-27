import { connectToDb } from '@db/database';
import { getRandomTags, searchRelatedTags } from '@db/services/tags.service';
import Pagination from 'components/pagination';
import TagsSection from 'components/tags/TagSection';
import VideosSection from 'components/videos/VideoSection';
import { GetServerSideProps, NextPage } from 'next';
import { TagRole, Video } from 'types/types';
import {
  getPage,
  getTagRoleByRoute,
  toJson,
  validateTagRole,
} from 'utils/helpers';

type Props = {
  page: number;
  keyword: string;
  videos: Video[];
  tags: string[];
  role: TagRole;
};

const TagPage: NextPage<Props> = ({ videos, page, keyword, tags, role }) => {
  return (
    <>
      <VideosSection headline={`${keyword}`} videos={videos} />
      <TagsSection headline="Related Tags" tags={tags} />
      <Pagination role={role} keyword={keyword} currentPage={page} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const path = context.query.path;
  const pageData = getPage(context.query.keyword as string);

  if (!pageData || !validateTagRole(path as string)) {
    return { redirect: { destination: '/', permanent: true } };
  }

  await connectToDb();
  const { page, keyword } = pageData;
  const videos = [] as Video[];
  const tags = await searchRelatedTags(keyword, 20, { _id: 0, name: 1 });

  return {
    props: {
      page,
      keyword,
      videos,
      tags: toJson(tags.map((tag) => tag.name)),
      role: getTagRoleByRoute(path as string),
    },
  };
};

export default TagPage;
