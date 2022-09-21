import Headline from 'components/ui/Headline';
import { Video } from 'models/types';
import React, { FC } from 'react';
import VideoItem from './VideoItem';

type Props = {
  headline: string;
  videos: Video[];
};

const VideosSection: FC<Props> = ({ headline, videos }) => {
  return (
    <section className="mt-5">
      <Headline variant="h2" text={headline} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-6">
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
};

export default VideosSection;
