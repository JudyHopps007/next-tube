import Headline from '@ui/Headline';
import { HeadlineVariant, Tag, TagDesign } from 'types/types';
import { FC } from 'react';
import { classNames } from 'utils/helpers';
import TagItem from './TagItem';

type Props = {
  headline: string;
  design?: TagDesign;
  tags: string[];
  variant?: HeadlineVariant;
};

const TagsSection: FC<Props> = ({
  headline,
  tags,
  variant = 'h2',
  design = 'tag',
}) => {
  return (
    <section className="mt-5">
      <Headline variant={variant} text={headline} />
      <div
        className={classNames(
          'flex flex-row content-around flex-wrap my-5',
          design === 'tag' ? 'items-center' : 'items-baseline'
        )}
      >
        {tags.map((tag, i) => (
          <TagItem key={i} tag={tag} design={design} />
        ))}
      </div>
    </section>
  );
};

export default TagsSection;
