import Headline from 'components/ui/Headline';
import { HeadlineVariants, Video } from 'models/types';
import React, { FC } from 'react';
import VideoItem from './VideoItem';

type Props = {
  headline: string;
  variant?: HeadlineVariant;
  videos: Video[];
};

const VideosSection: FC<Props> = ({ headline, videos, variant = 'h1' }) => {
  return (
    <section className="mt-5">
      <Headline variant={variant} text={headline} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-6">
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} showHd showViews />
        ))}
      </div>
    </section>
  );
};

export default VideosSection;