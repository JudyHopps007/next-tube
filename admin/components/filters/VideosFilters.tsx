import { SearchIcon } from '@heroicons/react/outline';
import DropDown from '@ui/Dropdown';
import useQueryPush from 'hooks/useQueryPush';
import React, { FC, useState } from 'react';
import { VideoStatusType } from 'types/types';

type Props = {
  orderBy: string | null;
  search: string;
  status: VideoStatusType;
};

const dateItems = [
  {
    label: 'Recently added',
    query: null,
  },
  {
    label: 'Oldest',
    query: 'asc',
  },
];

const statusItems = [
  {
    label: 'All Status',
    query: null,
  },
  {
    label: 'Up',
    query: 'up',
  },
  {
    label: 'Down',
    query: 'down',
  },
];

const VideosFilters: FC<Props> = ({ orderBy, status, search }) => {
  const [searchQuery, setSearchQuery] = useState(search);
  const [selectedDateFilterQuery, setSelectedDateFilterQuery] =
    useState(orderBy);
  const [selectedStatusFilterQuery, setSelectedStatusFilterQuery] =
    useState(status);
  const queryPush = useQueryPush();

  const updateDateFilterQuery = (newQuery: string | null) => {
    setSelectedDateFilterQuery(newQuery);
    queryPush.setQueryParam({ orderBy: newQuery });
  };

  const updateStatusFilterQuery = (newQuery: string | null) => {
    setSelectedStatusFilterQuery(newQuery as VideoStatusType);
    queryPush.setQueryParam({ status: newQuery });
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
      <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 w-full md:w-auto">
        <DropDown
          items={statusItems}
          selectedQuery={selectedStatusFilterQuery}
          updateFilterQuery={updateStatusFilterQuery}
        />
        <DropDown
          items={dateItems}
          selectedQuery={selectedDateFilterQuery}
          updateFilterQuery={updateDateFilterQuery}
        />
      </div>
    </div>
  );
};

export default VideosFilters;
