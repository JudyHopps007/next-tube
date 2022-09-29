import { EyeIcon, ClockIcon } from '@heroicons/react/outline';
import { Video } from 'types/types';
import React, { FC } from 'react';
import millify from 'millify';
import Link from 'next/link';
import { classNames } from 'utils/helpers';
import VideoTagItem from './VideoTagItem';
import { buildVideoUrl } from 'utils/navigation';

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
    <div className="bg-white hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800/70 text-gray-600 hover:text-gray-500 dark:hover:text-gray-100 dark:text-gray-300 justify-items-center rounded-md overflow-hidden hover:scale-[1.05] duration-300 shadow-lg group">
      <div className="relative">
        <Link href={buildVideoUrl(video.vid, video.title, 'video')}>
          <a>
            <img
              className="w-full object-fill"
              alt={video.title}
              src={video.thumbnail}
            />
          </a>
        </Link>
        {showHd && (
          <span className="bg-indigo-700 py-1 px-2 bg-opacity-90 text-white text-xs font-semibold rounded-md absolute top-1 right-1 group-hover:transition-opacity group-hover:opacity-0 group-hover:duration-500">
            HD
          </span>
        )}
        {showViews && (
          <span className="bg-slate-900 py-1 px-2 bg-opacity-95 text-white text-xs font-light rounded-tr-md absolute bottom-0 left-0 inline-flex group-hover:transition-opacity group-hover:opacity-0 group-hover:duration-500">
            <EyeIcon className="w-4 h-4 mr-1" /> {millify(video.views)}
          </span>
        )}
        {showDuration && (
          <span className="bg-slate-900/90 py-1 px-2 text-white text-xs font-light rounded-tl-md absolute bottom-0 right-0 inline-flex group-hover:transition-opacity group-hover:opacity-0 group-hover:duration-500">
            <ClockIcon className="w-4 h-4 mr-1" /> 4min
          </span>
        )}
      </div>
      <div
        className={classNames(
          'mx-2 mt-2 text-sm md:text-base line-clamp-2',
          showTags ? '' : 'mb-2'
        )}
      >
        {video.title}
      </div>

      {showTags && (
        <div className="mb-2 mx-2 mt-1 flex flex-row content-around flex-wrap">
          {video.tags.map((tag) => (
            <VideoTagItem key={tag} tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoItem;
