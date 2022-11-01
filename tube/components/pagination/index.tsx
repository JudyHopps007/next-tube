import Button from '@ui/Button';
import React, { FC } from 'react';

type Props = {
  currentPage: number;
  hrefPrevPage: string;
  hrefNextPage: string;
  maxPage: number;
};

const Pagination: FC<Props> = ({
  currentPage,
  hrefPrevPage,
  hrefNextPage,
  maxPage = 5,
}) => {
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  return (
    <div className="flex flex-row space-x-1 md:space-x-2 justify-center w-full my-5">
      {prevPage > 0 && <Button text="< Prev" href={hrefPrevPage} outline />}
      {nextPage <= maxPage && (
        <Button text="Next >" href={hrefNextPage} outline />
      )}
    </div>
  );
};

export default Pagination;
