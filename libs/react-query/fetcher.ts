import { setConsole } from 'react-query';
import { NextPageContext } from 'next';
import { request } from 'graphql-request';

import { client } from '../client';

/** Next.js like url: /user/[id] */
type QueryKeyUrl = string;
type QueryKeyParams = Record<string, any>;

// const buildQueryKey = (rawUrl: QueryKeyUrl, paramsKey: QueryKeyParams) => {
//   const params = { ...paramsKey };
//   let url = rawUrl;

//   Object.entries(params).forEach(([key, val]) => {
//     const keyRegExp = new RegExp(`\\[${key}\\]`, 'g');

//     if (url.search(keyRegExp) >= 0) {
//       delete params[key];
//       url = url.replace(new RegExp(keyRegExp), val);
//     }
//   });

//   return { url, params };
// };

const buildQueryKey = (rawUrl: QueryKeyUrl, paramsKey: QueryKeyParams) => {
  const params = { ...paramsKey };
  let url = rawUrl;

  Object.entries(params).forEach(([key, val]) => {
    const keyRegExp = new RegExp(`\\[${key}\\]`, 'g');

    if (url.search(keyRegExp) >= 0) {
      delete params[key];
      url = url.replace(new RegExp(keyRegExp), val);
    }
  });

  return { url, params };
};

export const fetcher = (gql: QueryKeyUrl, paramsKey: QueryKeyParams) => {
  // const { url, params } = buildQueryKey(gql, paramsKey);
  // console.log('wf', gql, params);
  return client(gql, paramsKey);
};
