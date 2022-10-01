import { PANEL_CONSTANTS } from 'constants/panel';
import React, { FC } from 'react';
import {
  calculateMaxItemPerPage,
  calculateMinItemPerPage,
} from 'utils/navigation';
import VideosFilters from './VideosFilters';

type Props = {
  filters: {
    orderBy: string;
    search: string;
  };
  videosCount: number;
  page: number;
};

const VideosManager: FC<Props> = ({ filters, videosCount, page }) => {
  return (
    <>
      <VideosFilters orderBy={filters.orderBy} search={filters.search} />
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left uppercase text-gray-400 border-b border-slate-700 bg-slate-800">
                <th className="px-4 py-3">Preview</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 bg-slate-800">
              <tr className="bg-slate-800 hover:bg-slate-700/80 text-gray-400 hover:text-gray-300 text-sm">
                <td className="px-4 py-3">
                  The Sliding Mr. Bones (Next Stop, Pottersville)
                </td>
                <td className="px-4 py-3">Malcolm Lockyer</td>
                <td className="px-4 py-3">1961</td>
              </tr>
              <tr className="bg-slate-800 hover:bg-slate-700/80 text-gray-400 hover:text-gray-300 text-sm">
                <td className="px-4 py-3">Witchy Woman</td>
                <td className="px-4 py-3">The Eagles</td>
                <td className="px-4 py-3">1972</td>
              </tr>
              <tr className="bg-slate-800 hover:bg-slate-700/80 text-gray-400 hover:text-gray-300 text-sm">
                <td className="px-4 py-3">Shining Star</td>
                <td className="px-4 py-3">Earth, Wind, and Fire</td>
                <td className="px-4 py-3">1975</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wideuppercase border-t border-slate-700 text-gray-400 bg-slate-800">
          <span className="flex items-center">
            {`Showing ${calculateMinItemPerPage(
              page,
              PANEL_CONSTANTS.VIDEOS_PER_PAGE,
              videosCount
            )}-${calculateMaxItemPerPage(
              page,
              PANEL_CONSTANTS.VIDEOS_PER_PAGE,
              videosCount
            )} of ${videosCount}`}
          </span>
        </div>
      </div>
    </>
  );
};

export default VideosManager;
