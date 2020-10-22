import { AppProps } from 'next/app';

import { HeadRoot } from 'features/layout/head';
import { CurrentUserProvider } from 'features/user';

import { ReactQueryDevtools, ReactQueryProvider } from 'libs/react-query';

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
      <HeadRoot />
      <ReactQueryDevtools />
      <CurrentUserProvider>
        <Component {...pageProps} />
      </CurrentUserProvider>
    </ReactQueryProvider>
  );
}
