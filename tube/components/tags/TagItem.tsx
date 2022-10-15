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
  const map: Record<number, any> = {
    1: 'font-semibold',
    2: 'font-normal',
    3: 'font-medium',
    4: 'font-semibold',
    5: 'font-bold',
  };
  return map[size] ?? 'font-medium';
};

const getTextSize = (size: number) => {
  const map: Record<number, any> = {
    1: 'text-xl',
    2: 'text-2xl',
    3: 'text-3xl',
    4: 'text-lg',
    5: 'text-4xl',
  };
  return map[size] ?? 'text-xl';
};

const getTextColor = (color: number) => {
  const map: Record<number, any> = {
    1: 'text-indigo-400 dark:hover:text-indigo-400/70',
    2: 'text-indigo-500 dark:hover:text-indigo-500/70',
    3: 'text-indigo-800 dark:hover:text-indigo-800/70',
    4: 'text-indigo-600  dark:hover:text-indigo-600/70',
    5: 'text-indigo-700 dark:hover:text-indigo-700/70',
  };
  return map[color] ?? 'text-indigo-500 dark:hover:text-indigo-500/70';
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
