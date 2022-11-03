import { MenuIcon, XIcon, SearchIcon } from '@heroicons/react/outline';
import NavButton from 'components/navbar/NavButton';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { removePageFromPath } from 'utils/helpers';
import NavItem from './NavItem';
import Search from './Search';

type Props = {};

const navigation = [
  {
    name: 'New',
    href: '/new',
  },
  {
    name: 'Top',
    href: '/top',
  },
  {
    name: 'Models',
    href: '/models',
  },
];

const Navbar: FC<Props> = ({}) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [visible, setVisible] = useState(true);
  const { asPath } = useRouter();

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    // disabled for now...
    return;

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
      className={`sticky z-10 border-b bg-background border-primary/10 backdrop-blur bg-opacity-80 ${
        visible ? 'top-0' : ''
      }`}
    >
      <nav className="flex flex-row justify-between items-center max-w-5xl mx-auto px-2 lg:px-0">
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
          <NavItem brand={true} href="/" title="NextTube" />
        </div>

        <div
          className={`${
            showMobileNav ? '' : 'hidden'
          } fixed md:relative md:flex md:flex-row md:items-center md:justify-start md:top-0 top-14 w-full pb-2 py-2 border-none`}
        >
          <ul className="flex flex-col md:flex-row mr-4 md:mr-0 md:space-x-2 items-center justify-items-center bg-primary md:bg-transparent text-center rounded-md border border-transparent">
            <li className="hidden md:flex">
              <NavItem brand={true} href="/" title="NextTube" />
            </li>
            {navigation.map((navItem, i) => (
              <li key={i} className={fullClass}>
                <NavItem
                  href={navItem.href}
                  title={navItem.name}
                  active={removePageFromPath(asPath) === navItem.href}
                />
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
        </div>
      </nav>
      {showMobileSearch && <div className="mb-12" />}
      {showMobileNav && <div className="mb-36" />}
    </header>
  );
};

export default Navbar;
