import { AppProps } from 'next/app';

import { HeadRoot } from 'features/layout/head';

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadRoot />
      <Component {...pageProps} />
    </>
  );
}
