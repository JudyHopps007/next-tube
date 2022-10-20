import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type TagColors = 'red' | 'green' | 'gray' | 'yellow' | 'sky' | 'orange';

type Props = {
  label: string;
  color?: TagColors;
};

const getColor = (color: TagColors) => {
  const map: Record<string, any> = {
    red: 'bg-red-700',
    green: 'bg-emerald-700',
    gray: 'bg-gray-700',
    orange: 'bg-orange-600',
    yellow: 'bg-amber-600',
    sky: 'bg-sky-600',
  };
  return map[color] ?? 'bg-gray-700';
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
