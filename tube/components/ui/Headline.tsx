import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  variant?: string;
  outline?: boolean;
  text: string;
};

const getTextSize = (variant: string) => {
  const map: Record<string, any> = {
    h3: 'text-xl md:text-2xl',
    h2: 'text-2xl md:text-3xl',
    h1: 'text-3xl md:text-4xl',
  };
  return map[variant] ?? 'text-3xl md:text-4xl';
};

const Headline: FC<Props> = ({ text, variant = 'h1', outline = false }) => {
  let className = classNames(
    'mb-1 md:mb-3 font-semibold',
    getTextSize(variant),
    outline
      ? 'text-main bg-primary rounded-md p-2 text-center md:text-left'
      : 'text-main'
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
