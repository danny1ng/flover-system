import { AppProps } from 'next/app';

import { HeadRoot } from 'features/layout/head';
import { StoreProvider } from 'features/store';
import { CurrentUserProvider } from 'features/user';

import { ReactQueryDevtools, ReactQueryProvider } from 'libs/react-query';

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
      <HeadRoot />
      <ReactQueryDevtools />
      <CurrentUserProvider>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </CurrentUserProvider>
    </ReactQueryProvider>
  );
}
