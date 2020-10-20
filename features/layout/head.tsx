import { FC } from 'react';
import NextHead from 'next/head';

import { favicon } from './favicon';

export const HeadRoot = () => (
  <Head>
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    <title>Flover System</title>
    <meta name="yandex-verification" content="269156c0a025e748" />

    {favicon}
  </Head>
);

export const Head: FC<{ title?: string }> = ({ title, children }) => (
  <NextHead>
    {title && <title>{title} | Flover System</title>}
    {children}
  </NextHead>
);
