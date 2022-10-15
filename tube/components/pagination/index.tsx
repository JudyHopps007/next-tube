import Button from '@ui/Button';
import React, { FC } from 'react';
import { buildTagUrl } from 'utils/navigation';

type Props = {
  currentPage: number;
  path: string;
  name: string;
};

const Pagination: FC<Props> = ({ currentPage, name, path }) => {
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  return (
    <div className="flex flex-row space-x-1 md:space-x-2 justify-center w-full my-5">
      {prevPage > 0 && (
        <Button
          text="< Prev"
          href={buildTagUrl(name, path, prevPage)}
          outline
        />
      )}
      {nextPage < 6 && (
        <Button
          text="Next >"
          href={buildTagUrl(name, path, nextPage)}
          outline
        />
      )}
    </div>
  );
};

export default Pagination;
