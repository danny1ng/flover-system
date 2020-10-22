import { QueryCache } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { NextPageContext } from 'next';

import { fetcher } from './fetcher';

export const createQueryPrefetcher = (ctx: NextPageContext) => {
  const queryCache = new QueryCache();

  const getDehydratedProps = () => ({ dehydratedState: dehydrate(queryCache) });

  return { queryCache, getDehydratedProps, fetcher };
};
