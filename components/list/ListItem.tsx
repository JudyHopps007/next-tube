import React, { FC } from 'react';
import Link from 'next/link';

type Props = { item: string };

const ListItem: FC<Props> = ({ item }) => {
  return (
    <li key={item} className="w-full">
      {item.length === 1 ? (
        <div className="bg-slate-700 text-gray-100 dark:text-indigo-400 dark:bg-indigo-400/10 px-1 font-bold rounded-md">
          {item}
        </div>
      ) : (
        <Link href="/">
          <a>
            <div className="px-1 dark:hover:bg-indigo-600 hover:bg-slate-200 hover:rounded-md">
              {item}
            </div>
          </a>
        </Link>
      )}
    </li>
  );
};

export default ListItem;
