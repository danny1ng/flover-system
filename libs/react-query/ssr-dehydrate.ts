import { QueryCache } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { graphQLClientClient } from '../client';

export const createQueryPrefetcher = () => {
  const queryCache = new QueryCache();

  const getDehydratedProps = () => ({ dehydratedState: dehydrate(queryCache) });

  return { queryCache, getDehydratedProps, fetcher: graphQLClientClient.request };
};
