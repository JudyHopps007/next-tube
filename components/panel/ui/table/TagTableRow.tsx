/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
import { Tag } from 'types/types';
import PanelTag from '../Tag';

type Props = {
  tag: Tag;
};

const TagTableRow: FC<Props> = ({ tag }) => {
  return (
    <tr className="bg-slate-800 hover:bg-slate-700/80 text-gray-400 hover:text-gray-300 text-sm">
      <td className="px-4 py-3">
        <div className="flex flex-row space-x-2 justify-start items-center">
          {tag.priority && <PanelTag label="priority" color="yellow" />}
          <PanelTag label={tag.role} color="gray" />
          <div className="font-thin text-xs">{tag.id}</div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-row space-x-2 items-center">
          <img
            className="w-12 h-12 rounded-md"
            src={tag.image ? tag.image : '/images/placeholder-actor.png'}
            alt={tag.name}
          />
          <div className="font-semibold">{tag.name}</div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="font-semibold">{tag.relatedTags.length}</div>
      </td>
      <td className="px-4 py-3">TODO</td>
    </tr>
  );
};

export default TagTableRow;
