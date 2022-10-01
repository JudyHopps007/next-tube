import { SearchIcon } from '@heroicons/react/outline';
import DropDown from '@panel/ui/Dropdown';
import React, { FC, useState } from 'react';

type Props = {};

const items = [
  {
    label: 'Recently added',
    query: 'createdAt_DESC',
  },
  {
    label: 'Oldest',
    query: 'createdAt_ASC',
  },
];

const VideosFilters: FC<Props> = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterQuery, setSelectedFilterQuery] = useState(
    items[0].query
  );

  const updateFilterQuery = (newQuery: string) => {
    setSelectedFilterQuery(newQuery);
  };

  return (
    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between items-center w-full rounded-lg bg-slate-800 px-4 py-3 mb-4">
      <div className="flex w-full md:w-auto">
        <input
          value={searchQuery}
          className="bg-slate-700 text-gray-300 focus:outline-none w-full md:w-72 rounded-l-md px-4 py-2 md:py-3 text-sm font-medium"
          type="text"
          placeholder="Enter searchfilter..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-r-md">
          <SearchIcon className="h-5 w-5 text-white" />
        </button>
      </div>
      <DropDown
        items={items}
        selectedQuery={selectedFilterQuery}
        updateFilterQuery={updateFilterQuery}
      />
    </div>
  );
};

export default VideosFilters;
