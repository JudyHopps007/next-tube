import { connectToDb } from '@db/database';
import { getVideoById } from '@db/services/videos.service';
import { GetServerSideProps, NextPage } from 'next';
import { Video } from 'types/types';
import { getVideoId, toJson } from 'utils/helpers';
import VideoSection from 'components/video';

type Props = {
  video: Video;
};

const VideoPage: NextPage<Props> = ({ video }) => {
  return <VideoSection video={video} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = getVideoId(context.query.id as string);
  if (!id) {
    return { redirect: { destination: '/', permanent: true } };
  }
  await connectToDb();
  const video = await getVideoById(id);
  console.log(video);
  return {
    props: {
      video: toJson(video),
    },
  };
};

export default VideoPage;
