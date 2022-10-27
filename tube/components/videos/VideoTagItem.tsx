import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  tag: string;
};

const VideoTagItem: FC<Props> = ({ tag }) => {
  return (
    <Link href="/tag/1">
      <a>
        <div className="font-medium text-xs md:text-sm text-tertiary bg-tertiary/20 rounded-full px-3 mb-1 hover:bg-tertiary/30 mr-2 hover:scale-[1.05] duration-300 shadow-md">
          {tag}
        </div>
      </a>
    </Link>
  );
};

export default VideoTagItem;
