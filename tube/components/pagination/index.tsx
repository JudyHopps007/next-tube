import Button from '@ui/Button';
import React, { FC } from 'react';
import { TagRole } from 'types/types';
import { buildTagUrl } from 'utils/navigation';

type Props = {
  currentPage: number;
  role: TagRole;
  keyword: string;
  maxPage: number;
};

const Pagination: FC<Props> = ({
  currentPage,
  keyword,
  maxPage = 5,
  role = 'tag',
}) => {
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  return (
    <div className="flex flex-row space-x-1 md:space-x-2 justify-center w-full my-5">
      {prevPage > 0 && (
        <Button
          text="< Prev"
          href={buildTagUrl(keyword, role, prevPage)}
          outline
        />
      )}
      {nextPage <= maxPage && (
        <Button
          text="Next >"
          href={buildTagUrl(keyword, role, nextPage)}
          outline
        />
      )}
    </div>
  );
};

export default Pagination;
