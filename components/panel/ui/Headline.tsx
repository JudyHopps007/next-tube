import React, { FC } from 'react';

type Props = {
  text: string;
};

const PanelHeadline: FC<Props> = ({ text }) => {
  return <h1 className="font-semibold text-xl md:text-2xl mb-3">{text}</h1>;
};

export default PanelHeadline;
