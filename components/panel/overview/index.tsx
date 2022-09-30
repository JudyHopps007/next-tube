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
      <OverviewItem title="Videos" count={counts.videosCount} />
      <OverviewItem title="Tags" count={counts.tagsCount} />
      <OverviewItem title="Categories" count={counts.categoriesCount} />
      <OverviewItem title="Actors" count={counts.actorsCount} />
    </div>
  );
};

export default OverviewSection;
