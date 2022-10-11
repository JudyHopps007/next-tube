import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  text: string;
  handleClick?: () => void;
  btnType?: string;
};

const getColor = (btnType: string) => {
  const map: Record<string, any> = {
    normal: 'bg-gray-500 hover:bg-gray-400',
    success: 'bg-emerald-600 hover:bg-emerald-500',
    danger: 'bg-red-500 hover:bg-red-400',
  };
  return map[btnType] ?? 'bg-gray-500 hover:bg-gray-400';
};

const ModalButton: FC<Props> = ({ handleClick, text, btnType = 'normal' }) => {
  return (
    <button
      onClick={handleClick}
      className={classNames(
        getColor(btnType),
        'p-1 rounded-md shadow-lg md:w-full'
      )}
    >
      {text}
    </button>
  );
};

export default ModalButton;
