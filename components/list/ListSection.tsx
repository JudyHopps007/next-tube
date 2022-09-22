import Headline from 'components/ui/Headline';
import { HeadlineVariant } from 'models/types';
import React, { FC, useState } from 'react';
import ListItem from './ListItem';

type Props = {
  keywords: string[];
  headline: string;
  variant?: HeadlineVariant;
};

const prepareList = (keywords: string[]) => {
  const sortedList = [] as string[];
  const keywordsSorted = keywords.sort();
  for (let item of keywordsSorted) {
    const firstLetter = item.toLowerCase().charAt(0).toUpperCase();
    if (firstLetter.match(/[a-z]/i)) {
      if (!sortedList.includes(firstLetter)) {
        sortedList.push(firstLetter);
      }
      if (!sortedList.includes(item)) {
        sortedList.push(item);
      }
    }
  }
  return sortedList;
};

const ListSection: FC<Props> = ({ keywords, headline, variant = 'h2' }) => {
  const [list, setList] = useState(prepareList(keywords));

  return (
    <section className="mt-5">
      <Headline variant={variant} text={headline} />
      <div className="bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-100 rounded-md shadow-lg py-2 px-2 dark:px-0">
        <ul className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 items-center text-sm md:text-base">
          {list.map((item) => (
            <ListItem key={item} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ListSection;
