import Link from 'next/link';
import React, { FC } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  href: string;
  brand?: boolean;
  title: string;
};

const NavItem: FC<Props> = ({ title, href, brand = false }) => {
  let className = classNames(
    'px-2 py-2 text-primary hover:text-primary',
    brand
      ? 'font-bold text-xl hover:text-primary'
      : 'text-primary hover:bg-tertiary hover:rounded-md'
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
