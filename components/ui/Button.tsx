import Link from 'next/link';
import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  text: string;
  outline?: boolean;
  href?: string;
  onClickHandler?: () => void;
};

const Button: FC<Props> = ({ text, onClickHandler, href, outline = false }) => {
  let className = classNames(
    'py-2 px-2 text-base md:text-md font-medium rounded-md hover:bg-indigo-700 hover:border-indigo-600',
    outline
      ? 'border-2 border-indigo-600 bg-transparent dark:text-gray-100 text-indigo-700 hover:text-gray-100'
      : 'border-2 border-transparent bg-indigo-600 text-white'
  );

  const buttonJSX = (
    <button onClick={onClickHandler} className={className}>
      {text}
    </button>
  );

  if (href) {
    return (
      <Link href={href}>
        <a>{buttonJSX}</a>
      </Link>
    );
  } else {
    return <>{buttonJSX}</>;
  }
};

export default Button;
