import React from 'react';

type Props = {
  children?: React.ReactNode;
  borderMode?: boolean;
  onClick?: () => void;
};

const NavButton = (props: Props) => {
  return (
    <div
      onClick={props.onClick}
      className="py-2 px-2 border-2 border-transparent text-base md:text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 hover:border-indigo-600"
    >
      {props.children}
    </div>
  );
};

export default NavButton;
