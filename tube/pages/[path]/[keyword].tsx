import { connectToDb } from '@db/database';
import { getSEOTags } from '@db/services/tags.service';
import { searchVideos } from '@db/services/videos.service';
import Pagination from 'components/pagination';
import TagsSection from 'components/tags/TagSection';
import VideosSection from 'components/videos/VideosSection';
import { videoPreviewSelector } from '@db/selectors';
import { GetServerSideProps, NextPage } from 'next';
import { TagRole, Video } from 'types/types';
import {
  getPage,
  getTagRoleByRoute,
  toJson,
  validateTagRole,
} from 'utils/helpers';
import config from 'tube.config';
import { buildTagUrl } from 'utils/navigation';

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
      <Pagination
        hrefPrevPage={buildTagUrl(keyword, role, page - 1)}
        hrefNextPage={buildTagUrl(keyword, role, page + 1)}
        currentPage={page}
        maxPage={configData.maxPage}
      />
      <TagsSection headline="Related Tags" variant="h2" tags={tags} />
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

  if (pageData.page > configData.maxPage)
    return { redirect: { destination: '/', permanent: true } };

  await connectToDb();
  const { page, keyword } = pageData;
  const videos = await searchVideos(
    keyword,
    configData.videosLimit,
    videoPreviewSelector
  );
  const tags = await getSEOTags(keyword, configData.tagsLimit, {
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
