import { connectToDb } from '@db/database';
import { getVideoById, searchRelatedVideos } from '@db/services/videos.service';
import { GetServerSideProps, NextPage } from 'next';
import { Video } from 'types/types';
import { getVideoId, toJson } from 'utils/helpers';
import VideoSection from 'components/video';
import VideosSection from 'components/videos/VideosSection';
import { videoSelector } from 'constants/database';
import { video as videoConfig } from 'tube.config';
import { getSEOTags } from '@db/services/tags.service';
import TagsSection from 'components/tags/TagSection';

type Props = {
  video: Video;
  relevantVideos: Video[];
  tags: string[];
};

const VideoPage: NextPage<Props> = ({ video, relevantVideos, tags }) => {
  return (
    <>
      <VideoSection video={video} />
      <VideosSection
        headline="Most Related Videos"
        variant="h2"
        videos={relevantVideos}
      />
      <TagsSection headline="Popular Searches" variant="h2" tags={tags} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = getVideoId(context.query.id as string);
  if (!id) {
    return { redirect: { destination: '/', permanent: true } };
  }
  await connectToDb();
  const video = await getVideoById(id, true);
  const searchString = `${video.title} ${
    video.alternativeTitle
  } ${video.tags.join(' ')} ${video.categories.join(' ')} ${video.models.join(
    ' '
  )}`;

  const relatedVideos = await searchRelatedVideos(
    id,
    searchString,
    videoConfig.videosLimit,
    videoSelector
  );

  const tags = await getSEOTags(
    `${video.title} ${video.alternativeTitle}`,
    videoConfig.tagsLimit,
    { _id: 0, name: 1 }
  );

  return {
    props: {
      video: toJson(video),
      relevantVideos: toJson(relatedVideos),
      tags: toJson(tags.map((tag) => tag.name)),
    },
  };
};

export default VideoPage;
