import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import NavButton from 'components/navbar/NavButton';
import { FC, useEffect, useState } from 'react';
import NavItem from './NavItem';
import Search from './Search';

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
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > 250) {
      setVisible(false);
      setShowMobileSearch(false);
      setShowMobileNav(false);
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fullClass = showMobileNav ? 'w-full' : '';

  return (
    <header
      className={`sticky z-10 border-b bg-gray-100 dark:bg-slate-900 border-b-slate-900/10 dark:border-b-slate-300/10 ${
        visible ? 'top-0' : ''
      }`}
    >
      <nav className="flex flex-row justify-between items-center bg-gray-100 dark:bg-slate-900 max-w-5xl mx-auto px-2 lg:px-0">
        <div className="md:hidden">
          <NavButton
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
          </NavButton>
        </div>

        <div className="md:hidden">
          <div className="ml-[3.75rem]">
            <NavItem brand={true} href="/" title="NextTube" />
          </div>
        </div>

        <div
          className={`${
            showMobileNav ? '' : 'hidden'
          } fixed md:relative md:flex md:flex-row md:items-center md:justify-start md:top-0 top-14 w-full dark:bg-slate-900 pb-2 py-2 border-none`}
        >
          <ul className="flex flex-col md:flex-row mr-4 md:mr-0 bg-white md:bg-gray-100 md:space-x-2 items-center justify-items-center dark:bg-slate-800 md:dark:bg-slate-900 text-center rounded-md border border-transparent">
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

        <div className="flex flex-row items-center justify-center space-x-2 py-2">
          <Search showMobileSearch={showMobileSearch} />
          <div
            className="flex md:hidden items-center py-2"
            onClick={() => {
              if (!showMobileSearch) {
                setShowMobileNav(false);
              }
              setShowMobileSearch(!showMobileSearch);
            }}
          >
            <NavButton>
              {showMobileSearch ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <SearchIcon className="h-5 w-5" />
              )}
            </NavButton>
          </div>

          <div className="flex items-center py-2 lg:px-2" onClick={toogleTheme}>
            <NavButton>
              {darkTheme ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </NavButton>
          </div>
        </div>
      </nav>
      {showMobileSearch && <div className="mb-12" />}
      {showMobileNav && <div className="mb-24" />}
    </header>
  );
};

export default Navbar;
