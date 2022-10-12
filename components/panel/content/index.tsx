import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

type Props = {};

const navigation = [
  {
    href: '/panel/add-tags',
    label: 'Add Tags',
    icon: <PlusIcon className="w-5 h-5 mr-1" />,
  },
  {
    href: '/panel/add-videos',
    label: 'Add Videos',
    icon: <PlusIcon className="w-5 h-5 mr-1" />,
  },
];

const AddContentSection = (props: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:space-x-2 md:space-y-0 space-y-2">
      {navigation.map((item) => (
        <Link key={item.href} href={item.href}>
          <a className="p-2 bg-slate-700 hover:bg-slate-700/90 w-full rounded-md font-semibold inline-flex items-center hover:text-gray-200">
            {item.icon}
            {item.label}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default AddContentSection;
