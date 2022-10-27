import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  borderColor?: string;
  padding?: string;
};

const Spinner: FC<Props> = ({
  borderColor = 'border-primary',
  padding = 'py-8',
}) => {
  return (
    <div className={classNames(padding, 'flex w-full justify-center mx-auto')}>
      <div
        style={{ borderTopColor: 'transparent' }}
        className={classNames(
          borderColor,
          'w-16 h-16 border-4 border-solid rounded-full animate-spin'
        )}
      ></div>
    </div>
  );
};

export default Spinner;
