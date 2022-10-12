import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  text: string;
  handleClick?: () => void;
  btnType?: string;
  width?: string;
  disabled?: boolean;
};

const getColor = (btnType: string) => {
  const map: Record<string, any> = {
    normal: 'bg-gray-500 hover:bg-gray-400',
    secondary: 'bg-sky-600 hover:bg-sky-500',
    success: 'bg-emerald-600 hover:bg-emerald-500',
    danger: 'bg-red-500 hover:bg-red-400',
  };
  return map[btnType] ?? 'bg-gray-500 hover:bg-gray-400';
};

const ModalButton: FC<Props> = ({
  handleClick,
  text,
  btnType = 'normal',
  width = '',
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={classNames(
        getColor(btnType),
        width,
        'p-2 rounded-md shadow-lg md:w-full'
      )}
    >
      {text}
    </button>
  );
};

export default ModalButton;
