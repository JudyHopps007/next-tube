import React, { FC } from 'react';

type Props = {
  title: string;
  count: number;
};

const OverviewItem: FC<Props> = ({ title, count }) => {
  return (
    <div className="bg-slate-800 text-gray-100 p-2 rounded-md w-full flex flex-row justify-between items-center">
      <div className="font-semibold text-xl">{title}</div>
      <div className="text-base font-semibold text-indigo-600">{count}</div>
    </div>
  );
};

export default OverviewItem;
