import { SearchIcon, XIcon } from '@heroicons/react/outline';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { slugify } from 'utils/helpers';
import { useRouter } from 'next/router';

type Props = {
  showMobileSearch: Boolean;
};

const Search: FC<Props> = ({ showMobileSearch }) => {
  const [query, setQuery] = useState('');
  const showClearSearch = query.length > 0;
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // at least 3 chars for a search
    if (query.length < 3) return;
    const slugifiedQuery = slugify(query);
    setQuery('');
    router.push(`/tag/${slugifiedQuery}`);
  };

  return (
    <div
      className={`${
        showMobileSearch ? 'fixed top-16 right-2 left-2' : 'hidden'
      } md:relative md:top-0 md:left-0 md:flex bg-indigo-600 rounded-md mx-auto`}
    >
      <div
        className={`${
          showMobileSearch ? 'dark:bg-slate-900 bg-gray-100 pb-2' : ''
        } flex flex-row`}
      >
        <div className="relative w-full">
          <input
            className="p-2 rounded-l-md w-full md:w-64 dark:bg-slate-800 dark:text-gray-300 bg-white focus:outline-none"
            type="text"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
            }}
            placeholder="What are you searching..."
          />
          {showClearSearch && (
            <div className="absolute right-2 top-3">
              <XIcon
                className="h-4 w-4 dark:text-gray-100 text-gray-600 hover:text-gray-600/40 dark:hover:text-gray-100/80 cursor-pointer"
                onClick={() => {
                  setQuery('');
                }}
              />
            </div>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-r-md"
        >
          <SearchIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Search;
