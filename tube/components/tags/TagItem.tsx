import { TagDesign } from 'types/types';
import Link from 'next/link';
import React, { FC } from 'react';
import { classNames } from 'utils/helpers';
import { buildTagUrl } from 'utils/navigation';

type Props = {
  tag: string;
  size?: number;
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

const TagItem: FC<Props> = ({
  tag,
  design = 'tag',
  useSize = false,
  size = 0,
}) => {
  return (
    <Link href={buildTagUrl(tag, 'tag')}>
      <a>
        {design === 'tag' ? (
          <div
            className={classNames(
              'text-sm md:text-base leading-5 mr-2',
              useSize ? getFont(size) : 'font-medium',
              'text-color bg-secondary/10 rounded-full py-1 px-3 hover:bg-secondary/30 hover:brightness-125 mb-2 hover:scale-[1.05] duration-300 ease-in shadow-md'
            )}
          >
            {tag}
          </div>
        ) : (
          <div
            className={classNames(
              getTextSize(size),
              'flex mr-2 p-1 font-semibold text-alternative hover:text-main'
            )}
          >
            {tag}
          </div>
        )}
      </a>
    </Link>
  );
};

export default TagItem;
