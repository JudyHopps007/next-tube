import React, { FC } from 'react';
import OverviewItem from './OverviewItem';

type Props = {
  counts: {
    videosCount: number;
    tagsCount: number;
    categoriesCount: number;
    modelsCount: number;
    keywordsCount: number;
    feedbacksCount: number;
  };
};

const OverviewSection: FC<Props> = ({ counts }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5 md:mb-10">
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
        title="Models"
        count={counts.modelsCount}
        href="/tags?role=model"
      />
      <OverviewItem
        title="Keywords"
        count={counts.keywordsCount}
        href="/keywords"
      />
      <OverviewItem
        title="Feedbacks"
        count={counts.feedbacksCount}
        href="/feedbacks"
      />
    </div>
  );
};

export default OverviewSection;
