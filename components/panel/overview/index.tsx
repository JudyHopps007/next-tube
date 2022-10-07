import React, { FC } from 'react';
import OverviewItem from './OverviewItem';

type Props = {
  counts: {
    videosCount: number;
    tagsCount: number;
    categoriesCount: number;
    actorsCount: number;
  };
};

const OverviewSection: FC<Props> = ({ counts }) => {
  return (
    <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-2">
      <OverviewItem
        title="Videos"
        href="/panel/videos"
        count={counts.videosCount}
      />
      <OverviewItem
        title="Tags"
        count={counts.tagsCount}
        href="/panel/tags?role=tag"
      />
      <OverviewItem
        title="Categories"
        count={counts.categoriesCount}
        href="/panel/tags?role=category"
      />
      <OverviewItem
        title="Actors"
        count={counts.actorsCount}
        href="/panel/tags?role=actor"
      />
    </div>
  );
};

export default OverviewSection;
