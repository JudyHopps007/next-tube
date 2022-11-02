import { CameraIcon, VideoCameraIcon } from '@heroicons/react/outline';
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
    <div className="text-main overflow-hidden group">
      <Link href={buildTagUrl(name, role)}>
        <a>
          <Image
            className="rounded-xl"
            alt={name}
            src={image || '/images/no-image.png'}
            layout={'responsive'}
            width={400}
            height={250}
          />

          <div className="flex flex-row justify-between items-center">
            <div className="inline-flex mx-2 mt-2 text-sm md:text-base font-semibold mb-2 items-center">
              {name}
            </div>
            <div className="inline-flex mx-2 mt-2 text-xs md:text-sm font-semibold mb-2 items-center">
              {count} <VideoCameraIcon className="ml-1 w-5 h-5" />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CategoriesItem;
