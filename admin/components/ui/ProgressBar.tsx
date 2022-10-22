import { RefreshIcon } from '@heroicons/react/outline';
import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  progress: number;
  target: number;
  completed: number;
  color?: string;
};

const ProgressBar: FC<Props> = ({
  progress,
  completed,
  target,
  color = 'bg-blue-600',
}) => {
  return (
    <div className="relative w-full mt-2 h-5 text-center bg-slate-800 rounded-md">
      <div
        className={classNames(
          color,
          'flex h-5 rounded-md transition-all duration-300 ease-in-out'
        )}
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute top-0 text-sm justify-between">
        <RefreshIcon className="inline-flex h-3 animate-spin duration-500 mr-1" />
        {`[${completed}/${target}] ${progress}%`}
      </span>
    </div>
  );
};

export default ProgressBar;
