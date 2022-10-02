import { SearchIcon } from '@heroicons/react/outline';
import DropDown from '@panel/ui/Dropdown';
import useQueryPush from 'hooks/useQueryPush';
import React, { FC, useState } from 'react';

type Props = {
  orderBy: string | null;
  search: string;
};

const defaultQuery = null;

const items = [
  {
    label: 'Recently added',
    query: defaultQuery,
  },
  {
    label: 'Oldest',
    query: 'asc',
  },
];

const VideosFilters: FC<Props> = ({ orderBy, search }) => {
  const [searchQuery, setSearchQuery] = useState(search);
  const [selectedFilterQuery, setSelectedFilterQuery] = useState(orderBy);
  const queryPush = useQueryPush();

  const updateFilterQuery = (newQuery: string | null) => {
    setSelectedFilterQuery(newQuery);
    queryPush.setQueryParam({ orderBy: newQuery });
  };

  return (
    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between items-center w-full rounded-lg bg-slate-800 px-4 py-3 mb-4">
      <div className="flex w-full md:w-auto">
        <input
          value={searchQuery}
          className="bg-slate-700 text-gray-300 focus:outline-none w-full md:w-72 rounded-l-md px-4 py-2 md:py-3 text-sm font-medium"
          type="text"
          placeholder="Search in titles..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button
          onClick={() => {
            queryPush.setQueryParam({ search: searchQuery });
          }}
          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-r-md"
        >
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
