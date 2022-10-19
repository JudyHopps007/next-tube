import React, { FC } from 'react';
import OverviewItem from './OverviewItem';

type Props = {
  counts: {
    videosCount: number;
    tagsCount: number;
    categoriesCount: number;
    actorsCount: number;
    keywordsCount: number;
  };
};

const OverviewSection: FC<Props> = ({ counts }) => {
  return (
    <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-2 mb-5 md:mb-10">
      <OverviewItem title="Videos" href="/videos" count={counts.videosCount} />
      <OverviewItem
        title="Tags"
        count={counts.tagsCount}
        href="/tags?role=tag"
      />
      <OverviewItem
        title="Categories"
        count={counts.categoriesCount}
        href="/tags?role=category"
      />
      <OverviewItem
        title="Actors"
        count={counts.actorsCount}
        href="/tags?role=actor"
      />
      <OverviewItem
        title="Keywords"
        count={counts.keywordsCount}
        href="/keywords"
      />
    </div>
  );
};

export default OverviewSection;
