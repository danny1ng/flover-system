import { QueryCache } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { NextPageContext } from 'next';

import { createGraphQLClientClient, graphQLClientClient } from '../client';

export const createQueryPrefetcher = (ctx: NextPageContext) => {
  const fetcher = ctx ? createGraphQLClientClient(ctx) : graphQLClientClient;
  const queryCache = new QueryCache();

  const getDehydratedProps = () => ({ dehydratedState: dehydrate(queryCache) });

  return { queryCache, getDehydratedProps, fetcher };
};
