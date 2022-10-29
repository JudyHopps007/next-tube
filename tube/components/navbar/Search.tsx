import { SearchIcon, XIcon } from '@heroicons/react/outline';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { slugifyAndPage } from 'utils/helpers';
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
    const slugifiedQuery = slugifyAndPage(query);
    setQuery('');
    router.push(`/tag/${slugifiedQuery}`);
  };

  return (
    <div
      className={`${
        showMobileSearch ? 'fixed top-16 right-2 left-2' : 'hidden'
      } md:relative md:top-0 md:left-0 md:flex bg-tertiary rounded-md mx-auto`}
    >
      <div
        className={`${
          showMobileSearch ? 'bg-primary pb-2' : 'bg-primary'
        } flex flex-row`}
      >
        <div className="relative w-full">
          <input
            className="p-2 rounded-l-md w-full md:w-64 bg-secondary text-secondary focus:outline-none"
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
                className="h-4 w-4 text-primary hover:text-primary/80 cursor-pointer"
                onClick={() => {
                  setQuery('');
                }}
              />
            </div>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="px-3 py-2 bg-tertiary hover:brightness-125 rounded-r-md"
        >
          <SearchIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Search;
