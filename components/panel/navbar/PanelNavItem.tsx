import Link from 'next/link';
import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  href: string;
  title: string;
  active?: boolean;
};

const PanelNavItem: FC<Props> = ({ title, href, active = false }) => {
  let className = classNames(
    'px-2 py-2 hover:text-white hover:bg-indigo-700 hover:rounded-md',
    active ? 'text-white font-semibold' : 'text-gray-300'
  );

  return (
    <Link href={href}>
      <a>
        <div className={className}>{title}</div>
      </a>
    </Link>
  );
};

export default PanelNavItem;
