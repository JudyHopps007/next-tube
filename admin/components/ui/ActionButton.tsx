import {
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  PencilAltIcon,
  RefreshIcon,
  XIcon,
} from '@heroicons/react/outline';
import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  actionMode: 'delete' | 'edit' | 'priorityUp' | 'priorityDown' | 'changeRole';
  actionHandler: () => Promise<void> | void;
};

const getIcon = (actionMode: string) => {
  const map: Record<string, any> = {
    delete: <XIcon className="w-5 h-5" />,
    edit: <PencilAltIcon className="w-5 h-5" />,
    priorityUp: <ChevronUpIcon className="w-5 h-5" />,
    priorityDown: <ChevronDownIcon className="w-5 h-5" />,
    changeRole: <RefreshIcon className="w-5 h-5" />,
  };

  return map[actionMode] ?? 'Invalid Action Mode';
};

const getColor = (actionMode: string) => {
  const map: Record<string, any> = {
    delete: 'bg-red-500 hover:bg-red-400',
    edit: 'bg-gray-500 hover:bg-gray-400',
    priorityUp: 'bg-amber-600 hover:bg-amber-500',
    priorityDown: 'bg-amber-600 hover:bg-amber-500',
    changeRole: 'bg-sky-600 hover:bg-sky-500',
  };

  return map[actionMode] ?? 'Invalid Action Mode';
};

const ActionButton: FC<Props> = ({ actionMode, actionHandler }) => {
  return (
    <button
      onClick={() => {
        actionHandler();
      }}
      className={classNames(
        getColor(actionMode),
        'text-gray-100 rounded-lg p-1 mr-1'
      )}
    >
      {getIcon(actionMode)}
    </button>
  );
};

export default ActionButton;
