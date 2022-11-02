import React from 'react';

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
};

const NavButton = (props: Props) => {
  return (
    <div
      onClick={props.onClick}
      className="py-2 px-2 border-2 border-transparent text-base md:text-md font-medium rounded-md text-white bg-secondary hover:brightness-125 hover:border-secondary"
    >
      {props.children}
    </div>
  );
};

export default NavButton;
