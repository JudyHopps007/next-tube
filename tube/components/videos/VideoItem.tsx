import { EyeIcon, ClockIcon } from '@heroicons/react/outline';
import { Video } from 'types/types';
import React, { FC } from 'react';
import millify from 'millify';
import Link from 'next/link';
import VideoTagItem from './VideoTagItem';
import { buildVideoUrl } from 'utils/navigation';
import Image from 'next/image';
import { formatTimeLite } from 'utils/time';

type Props = {
  video: Video;
  showHd?: boolean;
  showViews?: boolean;
  showDuration?: boolean;
  showTags?: boolean;
};

const VideoItem: FC<Props> = ({
  video,
  showHd = false,
  showViews = false,
  showDuration = false,
  showTags = false,
}) => {
  return (
    <div className="text-main justify-items-center overflow-hidden">
      <Link href={buildVideoUrl(video.slug)}>
        <a>
          <div className="relative group">
            <Image
              className="rounded-xl"
              alt={video.title}
              src={'/images/no-image.png'}
              layout={'responsive'}
              width={400}
              height={250}
            />

            {showHd && video.isHD && (
              <span className="bg-secondary py-1 px-2 bg-opacity-90 text-inverted text-xs font-semibold rounded-md absolute top-2 right-2 group-hover:opacity-0 duration-500 ease-in-out">
                HD
              </span>
            )}
            {showViews && (
              <span className="bg-black py-1 px-2 bg-opacity-80 text-inverted text-xs font-light rounded-md absolute bottom-2 left-2 inline-flex group-hover:opacity-0 duration-500 ease-in-out items-center">
                <EyeIcon className="w-4 h-4 mr-1" /> {millify(video.views)}
              </span>
            )}
            {showDuration && (
              <span className="bg-black bg-opacity-80 py-1 px-2 text-inverted text-xs font-light rounded-md absolute bottom-2 right-2 inline-flex group-hover:opacity-0 duration-500 ease-in-out items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                {formatTimeLite(video.duration)}
              </span>
            )}
          </div>

          <div className="mx-2 mt-2 line-clamp-2 mb-2 font-semibold">
            {video.title}
          </div>
        </a>
      </Link>
      {showTags && (
        <div className="mb-2 mx-2 mt-1 flex flex-row content-around flex-wrap">
          {video.categories.length > 0 &&
            video.categories.map((tag) => (
              <VideoTagItem key={tag} role={'category'} tag={tag} />
            ))}
          {video.models.length > 0 &&
            video.models.map((tag) => (
              <VideoTagItem key={tag} role={'model'} tag={tag} />
            ))}
        </div>
      )}
    </div>
  );
};

export default VideoItem;
