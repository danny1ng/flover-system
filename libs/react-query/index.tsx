import { FC } from 'react';
import { ReactQueryCacheProvider, ReactQueryConfig, ReactQueryConfigProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { redirect } from 'libs';

import { graphQLClientClient } from '../client';

interface ReactQueryProviderProps {
  config?: ReactQueryConfig<unknown, APIError>;
  dehydratedState: unknown;
}

let isRedirecting = false;

const defaultConfig: ReactQueryConfig<unknown, APIError> = {
  queries: {
    queryFn: (gql, we) => graphQLClientClient.request(gql, we),
    // queryFn: (a, b) => request('/api', a, b),
    onError: err => {
      if (err && err.statusCode === 401 && !isRedirecting) {
        isRedirecting = true;
        redirect(null, '/sign-in').then(() => {
          isRedirecting = false;
        });
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
