/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
import { Keyword, KeywordRole } from 'types/types';
import ActionButton from '@ui/ActionButton';
import PanelTag from '@ui/Tag';

type Props = {
  keyword: Keyword;
  changeRoleHandler: (id: number, role: KeywordRole) => Promise<void>;
  deleteHandler: (id: number) => Promise<void>;
};

const KeywordTableRow: FC<Props> = ({
  keyword,
  changeRoleHandler,
  deleteHandler,
}) => {
  return (
    <tr className="bg-slate-800 hover:bg-slate-700/80 text-gray-400 hover:text-gray-300 text-sm">
      <td className="px-4 py-3">
        <div className="flex flex-row space-x-2 justify-start items-center">
          <div className="font-thin text-xs">{keyword.id}</div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-row md:space-x-2 items-center">
          <div className="font-semibold">{keyword.name}</div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-row space-x-2 justify-start items-center">
          {keyword.isParsed && <PanelTag label="parsed" color="sky" />}
          {!keyword.isParsed && <PanelTag label="unparsed" color="sky" />}
          <PanelTag label={keyword.role} color="orange" />
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="font-semibold">{keyword.message}</div>
      </td>
      <td className="px-4 py-3">
        <div className="font-semibold">
          {keyword.videosCount === 0 ? '-' : keyword.videosCount}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-row items-center">
          <ActionButton
            actionMode="changeRole"
            actionHandler={changeRoleHandler.bind(
              null,
              keyword.id,
              keyword.role === 'keyword' ? 'title' : 'keyword'
            )}
          />
          <ActionButton
            actionMode="delete"
            actionHandler={deleteHandler.bind(null, keyword.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default KeywordTableRow;
