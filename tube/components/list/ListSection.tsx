import Headline from '@ui/Headline';
import { HeadlineVariant, TagRole } from 'types/types';
import React, { FC, useMemo } from 'react';
import ListItem from './ListItem';

type Props = {
  keywords: string[];
  headline: string;
  variant?: HeadlineVariant;
  role?: TagRole;
};

const prepareList = (keywords: string[]) => {
  const sortedList = [] as string[];
  const keywordsSorted = keywords.slice().sort();
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

const ListSection: FC<Props> = ({
  keywords,
  headline,
  variant = 'h2',
  role = 'tag',
}) => {
  const sortedList = useMemo(() => prepareList(keywords), [keywords]);

  return (
    <section className="mt-5">
      <Headline variant={variant} text={headline} />
      <div className="bg-background text-main rounded-md py-2 px-2">
        <ul className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 items-center text-sm md:text-base">
          {sortedList.map((item, i) => (
            <ListItem key={item} item={item} role={role} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ListSection;
