import React, { FC } from 'react';
import Headline from '@ui/Headline';
import { Category, HeadlineVariant } from 'types/types';
import CategoriesItem from './CategoriesItem';

type Props = {
  headline: string;
  variant?: HeadlineVariant;
  categories: Category[];
};

const CategoriesSection: FC<Props> = ({
  headline,
  categories,
  variant = 'h1',
}) => {
  return (
    <section className="mt-5">
      <Headline variant={variant} text={headline} />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:gird-cols-4 gap-5 my-6">
        {categories.map((category) => (
          <CategoriesItem
            key={category.id}
            role={category.role}
            name={category.name}
            image={category.image}
            count={category.videoCount}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
