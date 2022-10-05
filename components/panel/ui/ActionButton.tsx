import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilAltIcon,
  XIcon,
} from '@heroicons/react/outline';
import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  actionMode: 'delete' | 'edit' | 'priorityUp' | 'priorityDown';
  actionHandler: () => Promise<void>;
};

const getIcon = (actionMode: string) => {
  const map: Record<string, any> = {
    delete: <XIcon className="w-5 h-5" />,
    edit: <PencilAltIcon className="w-5 h-5" />,
    priorityUp: <ChevronUpIcon className="w-5 h-5" />,
    priorityDown: <ChevronDownIcon className="w-5 h-5" />,
  };

  return map[actionMode] ?? 'Invalid Action Mode';
};

const getColor = (actionMode: string) => {
  const map: Record<string, any> = {
    delete: 'bg-red-500',
    edit: 'bg-gray-500',
    priorityUp: 'bg-amber-600',
    priorityDown: 'bg-amber-600',
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
