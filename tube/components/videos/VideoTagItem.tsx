import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  tag: string;
};

const VideoTagItem: FC<Props> = ({ tag }) => {
  return (
    <Link href="/tag/1">
      <a>
        <div className="font-medium text-xs md:text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-400/10 rounded-full px-3 mb-1 hover:bg-indigo-400/20 mr-2 hover:scale-[1.05] duration-300 shadow-md">
          {tag}
        </div>
      </a>
    </Link>
  );
};

export default VideoTagItem;
