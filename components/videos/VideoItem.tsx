import { EyeIcon } from '@heroicons/react/outline';
import { Video } from 'models/types';
import React, { FC } from 'react';
import millify from 'millify';
import Link from 'next/link';

type Props = {
  video: Video;
};

const VideoItem: FC<Props> = ({ video }) => {
  return (
    <Link href={`/video/${video.id}`}>
      <a>
        <div className="bg-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 hover:text-gray-500 dark:hover:text-gray-100 dark:text-gray-300 justify-items-center rounded-md overflow-hidden hover:scale-[1.1] relative">
          <img className="w-fill object-fill" alt="" src={video.image} />
          <span className="bg-indigo-700 py-1 px-2 bg-opacity-90 text-white text-xs font-semibold rounded-md absolute top-1 right-1">
            HD
          </span>
          <span className="bg-indigo-700 py-1 px-2 bg-opacity-90 text-white text-xs font-light rounded-md absolute top-1 left-1 inline-flex">
            <EyeIcon className="w-4 h-4 mr-1" /> {millify(video.views)}
          </span>
          <div className="m-2 text-sm md:text-base line-clamp-2">
            {video.title}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default VideoItem;
