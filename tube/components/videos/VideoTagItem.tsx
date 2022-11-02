import Link from 'next/link';
import React, { FC } from 'react';
import { TagRole } from 'types/types';
import { buildTagUrl } from 'utils/navigation';

type Props = {
  tag: string;
  role: TagRole;
};

const VideoTagItem: FC<Props> = ({ tag, role = 'tag' }) => {
  return (
    <Link href={buildTagUrl(tag, role)}>
      <a>
        <div className="font-medium text-sm text-color bg-secondary/10 rounded-full px-3 mb-1 hover:brightness-125 hover:bg-secondary/30 mr-2 hover:scale-[1.05] duration-300 ease-in shadow-md">
          {tag}
        </div>
      </a>
    </Link>
  );
};

export default VideoTagItem;
