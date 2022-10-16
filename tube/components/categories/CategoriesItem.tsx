import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { TagRole } from 'types/types';
import { buildTagUrl } from 'utils/navigation';

type Props = {
  name: string;
  image: string;
  count: number;
  role: TagRole;
};

const CategoriesItem: FC<Props> = ({ name, image, count, role }) => {
  return (
    <div className="bg-white hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800/70 text-gray-600 hover:text-gray-500 dark:hover:text-gray-100 dark:text-gray-300 justify-items-center rounded-md overflow-hidden hover:scale-[1.05] duration-300 shadow-lg group">
      <Link href={buildTagUrl(name, role)}>
        <a>
          <Image
            alt={name}
            src={image}
            layout={'responsive'}
            width={450}
            height={250}
          />
        </a>
      </Link>
      <div className="flex flex-row justify-between items-center">
        <div className="flex mx-2 mt-2 text-sm md:text-base font-semibold mb-2">
          {name}
        </div>
        <div className="flex mx-2 mt-2 text-xs md:sm font-base mb-2">
          {count}
        </div>
      </div>
    </div>
  );
};

export default CategoriesItem;
