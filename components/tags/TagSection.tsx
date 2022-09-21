import Headline from 'components/ui/Headline';
import { HeadlineVariant } from 'models/types';
import { FC } from 'react';
import TagItem from './TagItem';

type Props = {
  headline: string;
  tags: string[];
  variant?: HeadlineVariant;
};

const TagsSection: FC<Props> = ({ headline, tags, variant = 'h2' }) => {
  return (
    <section className="mt-5">
      <Headline variant={variant} text={headline} />
      <div className="flex flex-row content-around flex-wrap items-center w-full space-x-2 my-5">
        {tags.map((tag, i) => (
          <TagItem
            key={i}
            tag={tag}
            size={Math.floor(Math.random() * 5 + 1)}
            useSize
          />
        ))}
      </div>
    </section>
  );
};

export default TagsSection;
