import Link from 'next/link';
import React, { FC } from 'react';
import { buildTagUrl } from 'utils/navigation';

type Props = {
  tags: string[];
};

const VideoTags: FC<Props> = ({ tags }) => {
  if (tags.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-row flex-wrap items-baseline justify-start">
      <span className="text-main mr-2">Tags:</span>
      {tags.map((tag, i) => (
        <div key={tag} className="flex mb-1 mr-2">
          <Link href={buildTagUrl(tag, 'tag')}>
            <a>
              <div className="text-color hover:brightness-125 cursor-pointer">
                {`# ${tag}`}
              </div>
            </a>
          </Link>
          {i < tags.length - 1 && ','}
        </div>
      ))}
    </div>
  );
};

export default VideoTags;
