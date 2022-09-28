import { TagDesign } from 'types/types';
import Link from 'next/link';
import React, { FC } from 'react';
import { classNames } from 'utils/helpers';
import { buildTagUrl } from 'utils/navigation';

type Props = {
  tag: string;
  size?: number;
  color?: number;
  useSize?: boolean;
  design: TagDesign;
};

const getFont = (size: number) => {
  switch (size) {
    case 1:
      return 'font-semibold';
    case 2:
      return 'font-normal';
    case 3:
      return 'font-medium';
    case 4:
      return 'font-semibold';
    case 5:
      return 'font-bold';
    default:
      return 'font-medium';
  }
};

const getTextSize = (size: number) => {
  switch (size) {
    case 1:
      return 'text-xl';
    case 2:
      return 'text-2xl';
    case 3:
      return 'text-3xl';
    case 4:
      return 'text-lg';
    case 5:
      return 'text-4xl';
    default:
      return 'text-xl';
  }
};

const getTextColor = (color: number) => {
  switch (color) {
    case 1:
      return 'text-indigo-400 dark:hover:text-indigo-400/70';
    case 2:
      return 'text-indigo-500 dark:hover:text-indigo-500/70';
    case 3:
      return 'text-indigo-800 dark:hover:text-indigo-800/70';
    case 4:
      return 'text-indigo-600  dark:hover:text-indigo-600/70';
    case 5:
      return 'text-indigo-700 dark:hover:text-indigo-700/70';
    default:
      return 'text-indigo-500 dark:hover:text-indigo-500/70';
  }
};

const TagItem: FC<Props> = ({
  tag,
  design = 'tag',
  useSize = false,
  size = 0,
  color = 0,
}) => {
  if (design == 'tag') {
    return (
      <div
        className={classNames(
          'text-sm md:text-base leading-5 mr-2',
          useSize ? getFont(size) : 'font-medium',
          'text-indigo-600 dark:text-indigo-400 bg-indigo-400/10 rounded-full py-1 px-3 hover:bg-indigo-400/20 mb-2 hover:scale-[1.05] duration-300 shadow-md'
        )}
      >
        <Link href={buildTagUrl(tag, 'tag')}>
          <a>{tag}</a>
        </Link>
      </div>
    );
  } else {
    return (
      <div
        className={classNames(
          getTextSize(size),
          getTextColor(color),
          'flex mr-2 p-1 font-semibold hover:text-slate-500'
        )}
      >
        <Link href={buildTagUrl(tag, 'tag')}>
          <a>{tag}</a>
        </Link>
      </div>
    );
  }
};

export default TagItem;
