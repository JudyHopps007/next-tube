import {
  CollectionIcon,
  HashtagIcon,
  UsersIcon,
  VideoCameraIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
import React, { FC } from 'react';

type Props = {
  title: string;
  count: number;
};

const getIcon = (icon: string) => {
  switch (icon) {
    case 'Videos':
      return (
        <VideoCameraIcon className="w-10 h-10 text-black duration-500 group-hover:transition-all group-hover:rotate-12" />
      );
    case 'Tags':
      return (
        <HashtagIcon className="w-10 h-10 text-black duration-500 group-hover:transition-all group-hover:rotate-12" />
      );
    case 'Categories':
      return (
        <CollectionIcon className="w-10 h-10 text-black duration-500 group-hover:transition-all group-hover:rotate-12" />
      );
    case 'Actors':
      return (
        <UsersIcon className="w-10 h-10 text-black duration-500 group-hover:transition-all group-hover:rotate-12" />
      );
    default:
      return (
        <ViewGridIcon className="w-10 h-10 text-black duration-500 group-hover:transition-all group-hover:rotate-12" />
      );
  }
};

const OverviewItem: FC<Props> = ({ title, count }) => {
  return (
    <div className="bg-slate-800 text-gray-100 p-3 rounded-md w-full flex flex-row justify-between items-center border-b-4 border-slate-700 group">
      <div className="rounded-full p-2 bg-slate-100">{getIcon(title)}</div>
      <div className="flex flex-col items-center justify-center w-24 md:w-auto">
        <div className="text-2xl font-semibold text-indigo-500">{count}</div>
        <div className="font-semibold text-base">{title}</div>
      </div>
    </div>
  );
};

export default OverviewItem;
