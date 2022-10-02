/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
import { Tag } from 'types/types';

type Props = {
  tag: Tag;
};

const TagTableRow: FC<Props> = ({ tag }) => {
  return (
    <tr className="bg-slate-800 hover:bg-slate-700/80 text-gray-400 hover:text-gray-300 text-sm">
      <td className="px-4 py-3">{tag.name}</td>
      <td className="px-4 py-3">TODO</td>
      <td className="px-4 py-3">TODO</td>
      <td className="px-4 py-3">TODO</td>
    </tr>
  );
};

export default TagTableRow;
