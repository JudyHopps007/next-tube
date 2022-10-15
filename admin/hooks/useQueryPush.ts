/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { removeEmptyParams } from 'utils/helpers';

type QueryParamsProps = {
  [x: string]: string | number | null;
};

const useQueryPush = () => {
  const [queryParam, setQueryParam] = useState<QueryParamsProps | null>(null);
  const { query, pathname, push } = useRouter();
  const currentQuery = query;

  useEffect(() => {
    if (!!queryParam && !!Object.values(queryParam)?.length) {
      const newQuery = { ...currentQuery, ...queryParam };
      const query = removeEmptyParams(newQuery);
      push(
        {
          pathname: pathname,
          query,
        },
        undefined,
        { scroll: false }
      );
    }
  }, [queryParam]);

  return { queryParam, setQueryParam };
};

export default useQueryPush;
