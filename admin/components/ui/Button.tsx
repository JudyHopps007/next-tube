import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  title: string;
  handleClick: () => void;
  btnType?: 'primary' | 'secondary';
};

const Button: FC<Props> = ({ title, handleClick, btnType = 'primary' }) => {
  return (
    <button
      onClick={handleClick}
      className={classNames(
        btnType === 'primary' ? 'bg-indigo-600 hover:bg-indigo-500' : '',
        btnType === 'secondary' ? 'bg-sky-600 hover:bg-sky-500' : '',
        'rounded-md w-full p-2 mt-2 justify-center items-center text-center'
      )}
    >
      {title}
    </button>
  );
};

export default Button;
