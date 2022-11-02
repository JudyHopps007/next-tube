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
    'py-2 px-2 text-base md:text-md font-medium rounded-md hover:brightness-125 hover:border-secondary w-full md:w-auto shadow-md',
    outline
      ? 'border-2 border-secondary bg-transparent text-main hover:text-main'
      : 'border border-transparent bg-secondary text-white'
  );

  const buttonJSX = (
    <button onClick={onClickHandler} className={className}>
      {text}
    </button>
  );

  if (href) {
    return (
      <Link href={href}>
        <a className="w-full md:w-auto">{buttonJSX}</a>
      </Link>
    );
  } else {
    return <>{buttonJSX}</>;
  }
};

export default Button;
