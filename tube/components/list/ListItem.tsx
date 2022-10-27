import React, { FC } from 'react';
import Link from 'next/link';
import { buildTagUrl } from 'utils/navigation';
import { TagRole } from 'types/types';

type Props = { item: string; role: TagRole };

const ListItem: FC<Props> = ({ item, role }) => {
  return (
    <li key={item} className="w-full">
      {item.length === 1 ? (
        <div className="text-tertiary bg-tertiary/10 px-1 font-bold rounded-md">
          {item}
        </div>
      ) : (
        <Link href={buildTagUrl(item, role)}>
          <a>
            <div className="px-1 hover:bg-tertiary hover:rounded-md">
              {item}
            </div>
          </a>
        </Link>
      )}
    </li>
  );
};

export default ListItem;
