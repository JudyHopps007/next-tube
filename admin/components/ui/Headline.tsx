import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  text: string;
  btnText?: string;
  href?: string;
  hasIcon?: boolean;
};

const Headline: FC<Props> = ({ text, btnText, href, hasIcon }) => {
  return (
    <div className="flex flex-row justify-between items-center mb-3">
      <div className="flex">
        <h1 className="font-semibold text-xl md:text-2xl">{text}</h1>
      </div>
      {btnText && href && (
        <Link href={href}>
          <a>
            <button className="flex text-base bg-indigo-600 hover:bg-indigo-700 py-2 px-2 rounded-md shadow-md items-center">
              {hasIcon ? <PlusIcon className="w-5 h-5 mr-1" /> : ''}
              {btnText}
            </button>
          </a>
        </Link>
      )}
    </div>
  );
};

export default Headline;
