import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

type Props = {};

const navigation = [
  {
    href: '/tags/add',
    label: 'Add Tags',
    icon: <PlusIcon className="w-5 h-5 mr-1" />,
  },
  {
    href: '/videos/add',
    label: 'Add Videos',
    icon: <PlusIcon className="w-5 h-5 mr-1" />,
  },
  {
    href: '/keywords/add',
    label: 'Add Keywords',
    icon: <PlusIcon className="w-5 h-5 mr-1" />,
  },
];

const AddContentSection = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-2 gap-y-2">
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
