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
  switch (actionMode) {
    case 'delete':
      return <XIcon className="w-5 h-5" />;
    case 'edit':
      return <PencilAltIcon className="w-5 h-5" />;
    case 'priorityUp':
      return <ChevronUpIcon className="w-5 h-5" />;
    case 'priorityDown':
      return <ChevronDownIcon className="w-5 h-5" />;
    default:
      return 'Invalid Action Mode';
  }
};

const getColor = (actionMode: string) => {
  switch (actionMode) {
    case 'delete':
      return 'bg-red-500';
    case 'edit':
      return 'bg-gray-500';
    case 'priorityUp':
    case 'priorityDown':
      return 'bg-amber-600';
    default:
      return 'Invalid Action Mode';
  }
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
