import { connectToDb } from '@db/database';
import { searchRelatedTags } from '@db/services/tags.service';
import { searchVideos } from '@db/services/videos.service';
import Pagination from 'components/pagination';
import TagsSection from 'components/tags/TagSection';
import VideosSection from 'components/videos/VideosSection';
import { videoSelector } from 'constants/database';
import { GetServerSideProps, NextPage } from 'next';
import { TagRole, Video } from 'types/types';
import {
  getPage,
  getTagRoleByRoute,
  toJson,
  validateTagRole,
} from 'utils/helpers';
import config from 'tube.config';

type Props = {
  page: number;
  keyword: string;
  videos: Video[];
  tags: string[];
  role: TagRole;
};

const TagPage: NextPage<Props> = ({ videos, page, keyword, tags, role }) => {
  const configData = config[role];
  return (
    <>
      <VideosSection headline={`${keyword}`} videos={videos} />
      <TagsSection headline="Related Tags" tags={tags} />
      <Pagination
        role={role}
        keyword={keyword}
        currentPage={page}
        maxPage={configData.maxPage}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const path = context.query.path;
  const pageData = getPage(context.query.keyword as string);

  if (!pageData || !validateTagRole(path as string)) {
    return { redirect: { destination: '/', permanent: true } };
  }
  const configData = config[path as TagRole];

  await connectToDb();
  const { page, keyword } = pageData;
  const videos = await searchVideos(
    keyword,
    configData.videosLimit,
    videoSelector
  );
  const tags = await searchRelatedTags(keyword, configData.tagsLimit, {
    _id: 0,
    name: 1,
  });

  return {
    props: {
      page,
      keyword,
      videos: toJson(videos),
      tags: toJson(tags.map((tag) => tag.name)),
      role: getTagRoleByRoute(path as string),
    },
  };
};

export default TagPage;
