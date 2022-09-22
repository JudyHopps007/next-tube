import { EyeIcon, ClockIcon } from '@heroicons/react/outline';
import { Video } from 'models/types';
import React, { FC } from 'react';
import millify from 'millify';
import Link from 'next/link';
import { classNames } from 'utils/helpers';

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
    <Link href={`/video/${video.id}`}>
      <a>
        <div className="bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 hover:text-gray-500 dark:hover:text-gray-100 dark:text-gray-300 justify-items-center rounded-md overflow-hidden hover:scale-[1.1] duration-300 shadow-lg group">
          <div className="relative">
            <img
              className="w-fill object-fill"
              alt={video.title}
              src={video.image}
            />
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
            <div className="mb-2 mx-2 text-xs md:text-sm line-clamp-1">
              tag tagdasdas tagdasdasdas tag dasdas tag taglol
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default VideoItem;
