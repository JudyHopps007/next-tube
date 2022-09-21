import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import Button from 'components/button';
import { FC, useState } from 'react';
import NavItem from './NavItem';

type Props = {
  darkTheme: boolean;
  toogleTheme: () => void;
};

const navigation = [
  {
    name: 'Example #1',
    href: '/',
  },
  {
    name: 'Example #2',
    href: '/',
  },
];

const Navbar: FC<Props> = ({ darkTheme, toogleTheme }) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const fullClass = showMobileNav ? 'w-full' : '';

  return (
    /* this makes the header sticky! */
    <header className="sticky top-0 z-10">
      <nav className="flex justify-between items-center bg-white dark:bg-slate-900 max-w-5xl mx-auto px-2 md:px-0">
        <div className="md:hidden">
          <Button
            onClick={() => {
              if (!showMobileNav) {
                setShowMobileSearch(false);
              }
              setShowMobileNav(!showMobileNav);
            }}
          >
            {showMobileNav ? (
              <XIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </Button>
        </div>

        <div className="md:hidden">
          <div className="ml-[3.75rem]">
            <NavItem brand={true} href="/" title="NextTube" />
          </div>
        </div>

        <div
          className={`${
            showMobileNav ? '' : 'hidden'
          } fixed md:relative md:flex md:top-0 top-14 w-full h-full`}
        >
          <ul className="flex flex-col md:flex-row mr-4 md:mr-0 md:py-2 bg-gray-100 md:space-x-2 items-center justify-items-start md:bg-white dark:bg-slate-800 md:dark:bg-slate-900 text-center rounded-md border border-transparent">
            <li className="hidden md:flex">
              <NavItem brand={true} href="/" title="NextTube" />
            </li>
            {navigation.map((navItem, i) => (
              <li key={i} className={fullClass}>
                <NavItem href={navItem.href} title={navItem.name} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-row items-center justify-center space-x-2">
          <div
            className={`${
              showMobileSearch ? 'fixed top-14 left-2 right-2' : 'hidden'
            } md:relative md:top-0 md:left-0 md:flex bg-indigo-600 rounded-md mx-auto`}
          >
            <div className="flex flex-row">
              <input
                className="p-2 rounded-l-md w-full md:w-64 dark:bg-slate-800 dark:text-gray-300 bg-gray-100 focus:outline-none"
                type="text"
                placeholder="What are you searching..."
              />
              <button className="px-3 py-2">
                <SearchIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
          <div
            className="flex md:hidden items-center py-2"
            onClick={() => {
              if (!showMobileSearch) {
                setShowMobileNav(false);
              }
              setShowMobileSearch(!showMobileSearch);
            }}
          >
            <Button>
              {showMobileSearch ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <SearchIcon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center py-2" onClick={toogleTheme}>
            <Button>
              {darkTheme ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>
      {(showMobileNav || showMobileSearch) && <div className="mb-20" />}
    </header>
  );
};

export default Navbar;
