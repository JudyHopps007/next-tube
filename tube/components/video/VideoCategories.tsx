import { UserCircleIcon } from '@heroicons/react/outline';
import React, { FC } from 'react';

type Props = {
  categories: string[];
  models: string[];
};

const VideoCategories: FC<Props> = ({ categories, models }) => {
  return (
    <div className="flex flex-row mt-2 items-center justify-start flex-wrap overflow-hidden mb-2 md:mb-0">
      {categories.map((category) => (
        <div
          key={category}
          className="py-1 px-3 border-2 border-secondary hover:bg-tertiary rounded-md cursor-pointer mr-2 mb-2 inline-flex items-center"
        >
          <UserCircleIcon className="w-5 h-5 mr-1" /> {category}
        </div>
      ))}
      {models.map((model) => (
        <div
          key={model}
          className="py-1 px-3 border-2 border-secondary hover:bg-tertiary rounded-md cursor-pointer mr-2 mb-2 inline-flex items-center"
        >
          <UserCircleIcon className="w-5 h-5 mr-1" /> {model}
        </div>
      ))}
    </div>
  );
};

export default VideoCategories;
