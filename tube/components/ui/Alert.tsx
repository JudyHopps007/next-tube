import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  alertType?: 'danger' | 'success' | 'default';
  message: string;
};

const Alert: FC<Props> = ({ message, alertType = 'default' }) => {
  return (
    <>
      {message && (
        <div
          className={classNames(
            alertType === 'default'
              ? 'text-sky-400 border-sky-700/70 bg-sky-500/20'
              : '',
            alertType === 'danger'
              ? 'text-red-400 border-red-700/70 bg-red-500/20'
              : '',
            alertType === 'success'
              ? 'text-emerald-400 border-emerald-700/70 bg-emerald-400/20'
              : '',
            'border-2 text-center rounded-md p-2 mb-4 text-sm mt-2'
          )}
        >
          {message}
        </div>
      )}
    </>
  );
};

export default Alert;
