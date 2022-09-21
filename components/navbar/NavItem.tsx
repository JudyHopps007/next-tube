import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  href: string;
  brand?: boolean;
  title: string;
};

const NavItem: FC<Props> = ({ title, href, brand = false }) => {
  let className =
    'px-2 py-2 dark:text-white hover:text-white text-black ' +
    (brand
      ? 'font-bold text-xl hover:text-black'
      : 'text-gray-700 hover:bg-indigo-700 hover:rounded-md');

  return (
    <Link href={href}>
      <a>
        <div className={className}>{title}</div>
      </a>
    </Link>
  );
};

export default NavItem;
