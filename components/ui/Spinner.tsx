import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  border?: string;
};

const Spinner: FC<Props> = ({
  border = 'dark:border-gray-400 border-black',
}) => {
  return (
    <div className="flex w-full justify-center mx-auto">
      <div
        style={{ borderTopColor: 'transparent' }}
        className={classNames(
          border,
          'w-16 h-16 border-4 border-solid rounded-full animate-spin'
        )}
      ></div>
    </div>
  );
};

export default Spinner;
