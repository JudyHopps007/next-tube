import { UserCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { FC } from 'react';
import { buildTagUrl } from 'utils/navigation';

type Props = {
  categories: string[];
  models: string[];
};

const VideoCategories: FC<Props> = ({ categories, models }) => {
  return (
    <div className="flex flex-row mt-2 items-center justify-start flex-wrap overflow-hidden mb-2 md:mb-0">
      {categories.map((category) => (
        <Link key={category} href={buildTagUrl(category, 'category')}>
          <a>
            <div className="py-1 px-3 border-2 border-secondary hover:bg-secondary rounded-md cursor-pointer mr-2 mb-2 inline-flex items-center">
              <UserCircleIcon className="w-5 h-5 mr-1" /> {category}
            </div>
          </a>
        </Link>
      ))}
      {models.map((model) => (
        <Link key={model} href={buildTagUrl(model, 'model')}>
          <a>
            <div className="py-1 px-3 border-2 border-secondary hover:bg-secondary rounded-md cursor-pointer mr-2 mb-2 inline-flex items-center">
              <UserCircleIcon className="w-5 h-5 mr-1" /> {model}
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default VideoCategories;
