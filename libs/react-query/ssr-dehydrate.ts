import { QueryCache } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { NextPageContext } from 'next';

import { createQueryFetcher } from './fetcher';

export const createQueryPrefetcher = (ctx: NextPageContext) => {
  const fetcher = createQueryFetcher(ctx);

  const queryCache = new QueryCache();

  const getDehydratedProps = () => ({ dehydratedState: dehydrate(queryCache) });

  return { queryCache, getDehydratedProps, fetcher };
};
