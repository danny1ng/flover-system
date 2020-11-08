import { FC } from 'react';
import { ReactQueryCacheProvider, ReactQueryConfig, ReactQueryConfigProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { redirect } from 'libs';

import { graphQLClientClient } from '../client';

interface ReactQueryProviderProps {
  config?: ReactQueryConfig<unknown, unknown>;
  dehydratedState: unknown;
}

const defaultConfig: ReactQueryConfig<unknown, unknown> = {
  queries: {
    queryFn: (gql, we) => graphQLClientClient.request(gql, we),
    onError: err => {
      const error = JSON.parse(JSON.stringify(err));
      if (error?.response?.errors[0] && error?.response?.errors[0].message === 'Not authorized') {
        redirect(null, '/sign-in').then(() => {});
      }
    },
  },
};

export const ReactQueryProvider: FC<ReactQueryProviderProps> = ({
  config = defaultConfig,
  children,
  dehydratedState,
}) => {
  return (
    <ReactQueryConfigProvider config={config as any}>
      <ReactQueryCacheProvider>
        <Hydrate state={dehydratedState}>{children}</Hydrate>
      </ReactQueryCacheProvider>
    </ReactQueryConfigProvider>
  );
};

export const ReactQueryDevtools =
  process.env.NODE_ENV === 'development'
    ? // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('react-query-devtools').ReactQueryDevtools
    : () => null;

export { createQueryPrefetcher } from './ssr-dehydrate';
