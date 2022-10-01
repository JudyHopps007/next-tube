import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React, { FC } from 'react';
import { Video } from 'types/types';
import {
  calculateMaxItemPerPage,
  calculateMinItemPerPage,
} from 'utils/navigation';
import VideoTableRow from './VideoTableRow';

type Props = {
  page: number;
  itemsCount: number;
  itemsPerPage: number;
  titles: string[];
  items: any[];
};

const Table: FC<Props> = ({
  itemsCount,
  page,
  items,
  itemsPerPage,
  titles,
}) => {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left uppercase text-gray-400 border-b border-slate-700 bg-slate-800">
              {titles.map((title) => (
                <th key={title} className="px-4 py-3">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 bg-slate-800">
            {items.map((item: Video) => (
              <VideoTableRow key={item.vid} video={item} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between px-4 py-3 text-xs font-semibold tracking-wideuppercase border-t border-slate-700 text-gray-400 bg-slate-800">
        <div className="flex items-center">
          {`Showing ${calculateMinItemPerPage(
            page,
            itemsPerPage,
            itemsCount
          )}-${calculateMaxItemPerPage(
            page,
            itemsPerPage,
            itemsCount
          )} of ${itemsCount}`}
        </div>
        <div className="flex flex-row justify-center items-center space-x-4">
          {page > 1 && (
            <div className="flex justify-center items-center hover:bg-indigo-600 hover:text-gray-100 py-2 px-3 rounded-lg cursor-pointer">
              <ChevronLeftIcon className="w-5 h-5" />
              Prev
            </div>
          )}
          {page * itemsPerPage < itemsCount && (
            <div className="flex justify-center items-center hover:bg-indigo-600 hover:text-gray-100 py-2 px-3 rounded-lg cursor-pointer">
              Next
              <ChevronRightIcon className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
