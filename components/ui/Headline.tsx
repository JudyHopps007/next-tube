import React, { FC } from 'react';

type Props = {
  variant?: string;
  text: string;
};

const Headline: FC<Props> = ({ text, variant = 'h1' }) => {
  if (variant == 'h3') {
    return (
      <h3 className="text-md md:text-2xl mb-1 md:mb-3 text-indigo-600 dark:text-indigo-500 font-semibold">
        {text}
      </h3>
    );
  }

  if (variant == 'h2') {
    return (
      <h2 className="text-xl md:text-3xl mb-1 md:mb-3 text-indigo-600 dark:text-indigo-500 font-semibold">
        {text}
      </h2>
    );
  }

  return (
    <h1 className="text-2xl md:text-4xl mb-1 md:mb-3 text-indigo-600 dark:text-indigo-500 font-semibold">
      {text}
    </h1>
  );
};

export default Headline;
