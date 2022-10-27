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
    <div className="hover:bg-secondary/40 hover:text-primary text-secondary justify-items-center rounded-md overflow-hidden shadow-lg group">
      <Link href={buildTagUrl(name, role)}>
        <a>
          <Image
            className="hover:scale-110 ease-in duration-500"
            alt={name}
            src={image || '/images/no-image.png'}
            layout={'responsive'}
            width={400}
            height={250}
          />

          <div className="flex flex-row justify-between items-center">
            <div className="flex mx-2 mt-2 text-sm md:text-base font-semibold mb-2">
              {name}
            </div>
            <div className="flex mx-2 mt-2 text-xs md:sm font-base mb-2">
              {count}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CategoriesItem;
