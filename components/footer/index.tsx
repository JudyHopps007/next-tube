import React, { FC } from 'react';

type FooterProps = {};

const Footer: FC<FooterProps> = (props) => {
  return (
    <footer className="py-4 bg-indigo-800 dark:bg-slate-200 dark:text-gray-700 text-gray-200 text-center">
      <span className="text-md font-semibold">NextTube Copyright 2022</span>
    </footer>
  );
};

export default Footer;
