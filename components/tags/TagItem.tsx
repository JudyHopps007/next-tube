import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  tag: string;
  size?: number;
  useSize?: boolean;
  design?: 'category' | 'cloud';
};

const getFont = (size: number) => {
  switch (size) {
    case 1:
      return 'font-light';
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

const TagItem: FC<Props> = ({
  tag,
  useSize = false,
  size = 0,
  design = 'cloud',
}) => {
  return (
    <div
      className={`text-xs md:text-sm leading-5 ${
        useSize ? getFont(size) : 'font-medium'
      } text-indigo-600 dark:text-indigo-400 bg-indigo-400/10 rounded-full py-1 px-3 hover:bg-indigo-400/20 mb-2`}
    >
      <Link href="/">
        <a>{tag}</a>
      </Link>
    </div>
  );
};

export default TagItem;
