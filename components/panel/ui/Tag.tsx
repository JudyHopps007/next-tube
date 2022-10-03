import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type TagColors = 'red' | 'green' | 'gray' | 'yellow' | 'sky';

type Props = {
  label: string;
  color?: TagColors;
};

const getColor = (color: TagColors) => {
  switch (color) {
    case 'red':
      return 'bg-red-700';
    case 'green':
      return 'bg-emerald-700';
    case 'gray':
      return 'bg-gray-700';
    case 'yellow':
      return 'bg-amber-600';
    case 'sky':
      return 'bg-sky-600';
    default:
      return 'bg-gray-700';
  }
};

const PanelTag: FC<Props> = ({ label, color = 'gray' }) => {
  return (
    <div
      className={classNames(
        getColor(color),
        'text-xs text-gray-100 rounded-full text-center px-2 py-1 font-semibold leading-tight mr-1 mb-1 md:mb-0'
      )}
    >
      {label}
    </div>
  );
};

export default PanelTag;
