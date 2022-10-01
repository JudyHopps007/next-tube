import { LogoutIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import NavButton from 'components/navbar/NavButton';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { classNames } from 'utils/helpers';
import PanelNavItem from './PanelNavItem';

type PanelNavbarProps = {};

const navigation = [
  {
    name: 'Statistics',
    href: '/panel',
  },
  {
    name: 'Manage Videos',
    href: '/panel/videos',
  },
  {
    name: 'Manage Tags',
    href: '/panel/tags',
  },
];

const handleLogout = () => {};

const PanelNavbar: FC<PanelNavbarProps> = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const fullClass = showMobileNav ? 'w-full' : '';
  const { pathname } = useRouter();

  return (
    <header
      className={classNames(
        showMobileNav ? 'fixed w-full top-0' : '',
        'border-b bg-slate-900 border-b-slate-300/10'
      )}
    >
      <nav className="flex flex-row justify-between items-center bg-slate-900 max-w-5xl mx-auto px-2 lg:px-0 py-2 md:py-0">
        <div className="md:hidden">
          <NavButton
            onClick={() => {
              setShowMobileNav(!showMobileNav);
            }}
          >
            {showMobileNav ? (
              <XIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </NavButton>
        </div>

        <div className="hidden md:flex md:flex-row md:items-center md:justify-start md:top-0 top-14 w-full bg-slate-900 pb-2 py-2 border-none">
          <ul className="flex flex-col md:flex-row mr-4 md:mr-0 md:space-x-2 items-center justify-items-center bg-slate-800 md:bg-slate-900 text-center rounded-md border border-transparent">
            {navigation.map((navItem, i) => (
              <li key={i} className={fullClass}>
                <PanelNavItem
                  active={pathname === navItem.href}
                  href={navItem.href}
                  title={navItem.name}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center md:justify-end items-center py-2 md:px-2 md:py-0 md:w-72">
          <NavButton onClick={handleLogout}>
            <div className="md:hidden">
              <LogoutIcon className="w-5 h-5" />
            </div>

            <div className="hidden md:flex items-center">
              <LogoutIcon className="w-5 h-5 mr-1" />
              Sign Out
            </div>
          </NavButton>
        </div>
      </nav>

      <div
        className={classNames(
          showMobileNav ? '' : 'hidden',
          'fixed z-50 overflow-auto flex w-full'
        )}
      >
        <div
          className="relative p-2 bg-slate-900 w-full m-auto flex-col flex h-screen"
          onClick={() => {
            setShowMobileNav(false);
          }}
        >
          <ul className="flex flex-col items-center justify-center bg-slate-800 md:bg-slate-900 text-center rounded-md border border-transparent">
            {navigation.map((navItem, i) => (
              <li key={i} className={fullClass}>
                <PanelNavItem
                  active={pathname === navItem.href}
                  href={navItem.href}
                  title={navItem.name}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default PanelNavbar;
