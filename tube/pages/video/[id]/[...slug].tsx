import { connectToDb } from '@db/database';
import { getVideoById } from '@db/services/videos.service';
import { GetServerSideProps, NextPage } from 'next';
import { Video } from 'types/types';
import { getVideoId, toJson } from 'utils/helpers';
import VideoSection from 'components/video';
import VideosSection from 'components/videos/VideoSection';

type Props = {
  video: Video;
  relevantVideos: Video[];
};

const VideoPage: NextPage<Props> = ({ video, relevantVideos }) => {
  return (
    <>
      <VideoSection video={video} />
      <VideosSection
        headline="Most Related Videos"
        variant="h2"
        videos={relevantVideos}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = getVideoId(context.query.id as string);
  if (!id) {
    return { redirect: { destination: '/', permanent: true } };
  }
  await connectToDb();
  const video = await getVideoById(id);
  return {
    props: {
      video: toJson(video),
      relevantVideos: [],
    },
  };
};

export default VideoPage;
