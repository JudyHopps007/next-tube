import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  variant?: string;
  outline?: boolean;
  text: string;
};

const getTextSize = (variant: string) => {
  switch (variant) {
    case 'h3':
      return 'text-xl md:text-2xl';
    case 'h2':
      return 'text-2xl md:text-3xl';
    case 'h1':
    default:
      return 'text-3xl md:text-4xl';
  }
};

const Headline: FC<Props> = ({ text, variant = 'h1', outline = false }) => {
  let className = classNames(
    'mb-1 md:mb-3  font-semibold',
    getTextSize(variant),
    outline
      ? 'bg-indigo-700 text-slate-100 dark:text-gray-100 dark:bg-slate-800/80 rounded-md p-2 text-center md:text-left'
      : 'text-slate-800 dark:text-gray-100'
  );

  if (variant == 'h3') {
    return <h3 className={className}>{text}</h3>;
  }

  if (variant == 'h2') {
    return <h2 className={className}>{text}</h2>;
  }

  return <h1 className={className}>{text}</h1>;
};

export default Headline;
