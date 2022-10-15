import React, { FC } from 'react';

type FooterProps = {};

const Footer: FC<FooterProps> = (props) => {
  return (
    <footer className="py-4 bg-gray-100 dark:bg-slate-900 dark:text-gray-100 text-black text-center border-t border-slate-900/10 dark:border-slate-300/10">
      <span className="text-md font-semibold">NextTube Copyright 2022</span>
    </footer>
  );
};

export default Footer;
