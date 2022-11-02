import Link from 'next/link';
import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  href: string;
  brand?: boolean;
  active?: boolean;
  title: string;
};

const NavItem: FC<Props> = ({ title, href, brand = false, active = false }) => {
  let className = classNames(
    'px-2 py-2 text-main hover:text-main',
    brand
      ? 'font-bold text-xl hover:text-main'
      : 'text-main hover:bg-secondary hover:rounded-md',
    active ? 'md:border-b-2 md:border-b-secondary font-semibold' : ''
  );

  return (
    <Link href={href}>
      <a>
        <div className={className}>{title}</div>
      </a>
    </Link>
  );
};

export default NavItem;
