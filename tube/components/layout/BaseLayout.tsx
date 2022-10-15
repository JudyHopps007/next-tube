import Footer from 'components/footer';
import Navbar from 'components/navbar';
import React, { FC, useState, useEffect } from 'react';

type BaseLayoutProps = {
  children: React.ReactNode;
};

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState<boolean | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme]);

  const changeThemeHandler = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className="bg-gray-100 dark:bg-slate-900 text-black dark:text-gray-100">
      <Navbar darkTheme={darkTheme!} toogleTheme={changeThemeHandler} />
      <main className="container max-w-5xl mx-auto min-h-screen px-2">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
