import Headline from '@ui/Headline';
import { HeadlineVariant, Video } from 'types/types';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gird-cols-4 gap-5 my-6">
        {videos.map((video) => (
          <VideoItem
            key={video.id}
            video={video}
            showHd
            showViews
            showDuration
          />
        ))}
      </div>
    </section>
  );
};

export default VideosSection;
