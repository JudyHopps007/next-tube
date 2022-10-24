import { ChevronDownIcon } from '@heroicons/react/outline';
import React, { FC, useEffect, useRef, useState } from 'react';
import { classNames } from 'utils/helpers';

type Props = {
  items: {
    label: string;
    query: string | null;
  }[];
  selectedQuery: string | null;
  updateFilterQuery: (newQuery: string | null) => void;
};

const DropDown: FC<Props> = ({ items, selectedQuery, updateFilterQuery }) => {
  const selectedItem = items.find((item) => item.query === selectedQuery);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClicks = (event: MouseEvent) => {
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClicks);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClicks);
    };
  }, [showDropdown]);

  return (
    <div
      ref={dropdownRef}
      className="relative flex flex-row justify-between items-center w-full md:w-auto rounded-md text-sm font-medium dark:bg-slate-800 dark:text-gray-300 bg-white shadow-sm cursor-pointer min-w-[10rem] text-black"
    >
      <button
        type="button"
        className="flex justify-between items-center px-4 py-2 md:py-3 w-full focus:outline-none dark:text-gray-100 font-semibold"
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        {selectedItem?.label}
        <ChevronDownIcon className="flex w-5 h-5" />
      </button>

      {showDropdown && (
        <div className="z-50 absolute right-0 top-10 md:top-12 rounded-md w-full dark:bg-slate-800 dark:text-gray-300 bg-white shadow-lg">
          <div className="py-1">
            {items.map((item) => (
              <div
                key={item.query}
                onClick={() => {
                  updateFilterQuery(item.query);
                  setShowDropdown(false);
                }}
                className={classNames(
                  item.query === selectedQuery
                    ? 'text-black dark:text-gray-100'
                    : '',
                  'block px-4 py-2 text-sm hover:bg-slate-200 hover:dark:bg-slate-700 cursor-pointer'
                )}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
